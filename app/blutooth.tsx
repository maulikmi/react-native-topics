import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Platform,
  PermissionsAndroid,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import RNBluetoothClassic, {
  BluetoothDevice,
} from "react-native-bluetooth-classic";
import { BleManager, ScanMode } from "react-native-ble-plx";

export const manager = new BleManager();

const ReactMotionExample = () => {
  const [deviceFetch, setDeviceFetch] = useState<{
    devices: BluetoothDevice[];
    accepting: boolean;
    discovering: boolean;
  }>({
    devices: [],
    accepting: false,
    discovering: false,
  });

  const [devices, setDevices] = useState([]);
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [batteryLevel, setBatteryLevel] = useState(null);

  useEffect(() => {
    const scanDevices = () => {
      manager.startDeviceScan(null, null, (error, device) => {
        if (error) {
          console.log("Scan error: ", error);
          return;
        }

        // Check if the device has a name or localName
        if (device?.name || device?.localName) {
          setDevices((prevDevices) => {
            // Avoid adding duplicate devices
            const deviceExists = prevDevices.some((d) => d.id === device.id);
            if (!deviceExists) {
              return [...prevDevices, device];
            }
            return prevDevices;
          });
        }
      });

      // Stop scanning after 10 seconds
      // setTimeout(() => {
      //   manager.stopDeviceScan();
      //   console.log("Scanning stopped.");
      // }, 100000);
    };

    scanDevices();

    // Clean up when the component is unmounted
    return () => manager.stopDeviceScan();
  }, [manager]);

  const connectToDevice = async (device) => {
    try {
      console.log(`Connecting to device: ${device.name || device.localName}`);
      const connected = await manager.connectToDevice(device.id);
      setConnectedDevice(connected);
      console.log(
        "Connected to device: ",
        connected.name || connected.localName
      );

      await connectToDeviceAndReadBattery(connected);

      //   // Discover services and list them
      // await getAvailableServices(connected);
      //   console.log("Discovered services and characteristics");

      //   // Read battery level
      //   const batteryData = await getBatteryLevel(connected);
      //   if (batteryData) {
      //     setBatteryLevel(batteryData);
      //   }
    } catch (error) {
      console.log("Connection error: ", error);
    }
  };

  const getAvailableServices = async (device) => {
    try {
      await device.discoverAllServicesAndCharacteristics();
      const services = await device.services();
      console.log("Available services:");
      services.forEach((service) =>
        console.log(`Service UUID: ${service.uuid}`)
      );
    } catch (error) {
      console.log("Failed to discover services:", error);
    }
  };

  const getCharacteristics = async (device, serviceUUID) => {
    try {
      const characteristics = await device.characteristicsForService(
        serviceUUID
      );
      console.log(`Characteristics for service ${serviceUUID}:`);
      characteristics.forEach((char) =>
        console.log(`Characteristic UUID: ${char.uuid}`)
      );
      return characteristics;
    } catch (error) {
      console.log(
        `Failed to get characteristics for service ${serviceUUID}:`,
        error
      );
      return [];
    }
  };

  const connectToDeviceAndReadBattery = async (device) => {
    try {
      console.log(`Connecting to device: ${device.name || device.localName}`);
      const connectedDevice = await manager.connectToDevice(device.id);
      console.log(
        "Connected to device:",
        connectedDevice.name || connectedDevice.localName
      );

      // Discover services and characteristics
      await connectedDevice.discoverAllServicesAndCharacteristics();
      const services = await connectedDevice.services();

      for (const service of services) {
        console.log(`Service UUID: ${service.uuid}`);
        const characteristics = await getCharacteristics(
          connectedDevice,
          service.uuid
        );

        // Attempt to read characteristic values
        for (const char of characteristics) {
          try {
            const value = await connectedDevice.readCharacteristicForService(
              service.uuid,
              char.uuid
            );
            console.log(
              `Value for characteristic ${char.uuid} in service ${service.uuid}:`,
              value.value
            );
          } catch (readError) {
            console.log(
              `Failed to read characteristic ${char.uuid}:`,
              readError
            );
          }
        }
      }
    } catch (error) {
      console.log("Error during connection or discovery:", error);
    }
  };

  const getBatteryLevel = async (device) => {
    try {
      // UUIDs for Battery Service and Battery Level characteristic
      const BATTERY_SERVICE_UUID = "0000180f-0000-1000-8000-00805f9b34fb";
      const BATTERY_LEVEL_UUID = "00002a19-0000-1000-8000-00805f9b34fb";

      // Read the battery level characteristic
      const characteristic = await device.readCharacteristicForService(
        BATTERY_SERVICE_UUID,
        BATTERY_LEVEL_UUID
      );

      // Decode the battery level (value is in Base64 format)
      const batteryLevel = parseInt(characteristic.value, 16);
      console.log("Battery Level: ", batteryLevel);
      return batteryLevel;
    } catch (error) {
      console.log("Failed to read battery level: ", error);
      return null;
    }
  };

  useEffect(() => {
    // manager.startDeviceScan(null, null, (error, device) => {
    //   if (error) {
    //     // Handle error (scanning will be stopped automatically)
    //     console.log("error >>>>>>>>>", error);
    //     return;
    //   }

    //   if (device?.name) {
    //     console.log("device name >>>>>>>>>", device?.name);
    //     return;
    //   }

    //   if (device?.localName) {
    //     console.log("device localName >>>>>>>>>", device?.localName);
    //     return;
    //   }
    // });

    RNBluetoothClassic.onDeviceConnected((device) => {
      console.log("onDeviceConnected >>>>>>>>>", device);
    });

    RNBluetoothClassic.onDeviceDisconnected((device) => {
      console.log("onDeviceDisconnected >>>>>>>>>", device);
    });
  }, []);

  async function requestPermissions() {
    try {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, // For backward compatibility
        ]);

        console.log("Bluetooth permissions", granted);

        if (
          granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log("Bluetooth permissions granted");
          return true;
        } else {
          console.log("Bluetooth permissions denied");
          return false;
        }
        // return true;
      }
      return true; // iOS handles permissions differently
    } catch (err) {
      console.warn(err);
      return false;
    }
  }

  const getBondedDevices = async () => {
    console.log("DeviceListScreen::getBondedDevices");
    try {
      setDeviceFetch({ ...deviceFetch, discovering: true });
      let bonded = await RNBluetoothClassic.getBondedDevices();
      console.log("DeviceListScreen::getBondedDevices found", bonded);
      setDeviceFetch({ devices: bonded, accepting: true, discovering: false });
    } catch (error) {
      console.log("DeviceListScreen::getBondedDevices error", error);
    }
  };

  async function discoverDevices() {
    // const permissionsGranted = await requestPermissions();
    // if (!permissionsGranted) {
    //   console.log("Permissions not granted");
    //   return;
    // }
    const isEnabled = await RNBluetoothClassic.requestBluetoothEnabled();
    if (isEnabled) {
      setDeviceFetch({ ...deviceFetch, discovering: true });
      const list = await RNBluetoothClassic.startDiscovery();
      setDeviceFetch({ devices: list, accepting: true, discovering: false });
      console.log("Paired Devices:", JSON.stringify(list));
    } else {
      console.log("Bluetooth is not enabled");
    }
  }

  const renderItem = ({ item }) => (
    <View style={styles.deviceContainer}>
      <Text style={styles.deviceText}>
        {item.name || item.localName} ({item.id})
      </Text>
      <TouchableOpacity
        style={styles.connectButton}
        onPress={() => connectToDevice(item)}
      >
        <Text style={styles.buttonText}>Connect</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.heading}>BLE Devices</Text>
        {connectedDevice && (
          <View>
            <Text style={styles.deviceInfo}>
              Connected to: {connectedDevice.name || connectedDevice.localName}
            </Text>
            {batteryLevel !== null ? (
              <Text style={styles.batteryInfo}>
                Battery Level: {batteryLevel}%
              </Text>
            ) : (
              <Text style={styles.batteryInfo}>Reading battery level...</Text>
            )}
          </View>
        )}
        <FlatList
          data={devices}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={styles.noDevicesText}>No devices found</Text>
          }
        />
      </View>

      <View style={{ flex: 1 }}>
        {deviceFetch.discovering ? (
          <ActivityIndicator />
        ) : deviceFetch.devices && deviceFetch.devices.length > 0 ? (
          <FlatList
            ListHeaderComponent={
              <Button onPress={getBondedDevices} title="Bonded device" />
            }
            data={deviceFetch.devices}
            keyExtractor={(item) => item.address}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.box}
                onPress={async () => {
                  console.log(">>>>>>>>>>", "Conecting....");
                 
                  // const connectDevice = await RNBluetoothClassic.pairDevice(
                  //   item.address
                  // );

                  // console.log("pairDevice >>>>>>>>>>", connectDevice);

                  const connectToDevice = await RNBluetoothClassic.connectToDevice(item.address)
                  console.log("connectToDevice >>>>>>>>>>", connectToDevice);
                  // const selfConnect = await item.connect();
                  // console.log("selfConnect >>>>>>>>>>", selfConnect);

                  // console.log("pairDevice >>>>>>>>>>", connectDevice);
                  // const data = await RNBluetoothClassic.readFromDevice(
                  //   item.address
                  // );
                  // console.log("connectToDevice >>>>>>>>>>", data);

                  // const connectDevice = await item.connect();
                  console.log(
                    ">>>>>>>>>>",
                    "isConnected >>>>>>>>>",
                    await item.isConnected()
                  );
                  await item.onDataReceived((data) => {
                    console.log("onDataReceived >>>>>>>>>>", data);
                  });
                }}
              >
                {item.name && <Text style={styles.text}>{item.name}</Text>}
                {/* <Text style={styles.text}>{item.address}</Text> */}
              </TouchableOpacity>
            )}
          />
        ) : (
          <Button onPress={discoverDevices} title="Start" />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 100,
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "black",
    fontSize: 18,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  deviceContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    marginVertical: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  deviceText: {
    flex: 1,
    fontSize: 16,
    color: "black",
  },
  connectButton: {
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  noDevicesText: {
    textAlign: "center",
    fontSize: 16,
    color: "black",
    marginTop: 20,
  },
  deviceInfo: {
    fontSize: 16,
    marginVertical: 8,
  },
  batteryInfo: {
    fontSize: 16,
    color: "green",
    marginVertical: 8,
  },
});

export default ReactMotionExample;
