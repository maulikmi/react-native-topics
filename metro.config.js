// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add custom asset extensions
config.resolver.assetExts.push('obj', 'mtl','tga','gltf','bin','usdz','3ds','dae','fbx','vrx');

module.exports = config;
