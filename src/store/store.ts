class Store {
  data: any = {};
  get(key: string) {
    return this.data[key];
  }

  set(key: string, value: any) {
    this.data[key] = value;
  }
  clear(key: string) {
    delete this.data[key];
  }
}
const store = new Store();

export default store;
