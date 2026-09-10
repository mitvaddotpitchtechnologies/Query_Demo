module.exports = {
  preset: '@react-native/jest-preset',
  transformIgnorePatterns: [
    'node_modules/(?!((@react-native|@react-navigation|@reduxjs|react-native|react-redux|immer|use-sync-external-store)/))',
  ],
};
