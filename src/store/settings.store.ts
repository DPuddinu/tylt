class SettingsStore {
  setupDone: boolean = false;

  getSetupDone() {
    return this.setupDone;
  }

  setSetupDone(setupDone: boolean) {
    this.setupDone = setupDone;
  }
}
const settingsStore = new SettingsStore();
export default settingsStore;
