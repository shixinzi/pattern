
module.exports = {
  /**
   * 将数据放置到localstorage:类似于map的set方法，如果value不是string对象，会用JSON.stringify转化为string，
   * @method setCookie
   * @public
   * @static
   * @param {String} key key
   * @param {String} value 值
   */
  set: function(key, value) {
    if (this.isSuppLocalStorage()) {
      if (typeof(value) !== "string") {
        value = JSON.stringify(value);
      }
      try {
        window.localStorage.setItem(key, value);
        return true;
      } catch (e) {

      }
    }
    return false;
  },

  /**
   * 从localstorage中获得数据
   * @method get
   * @public
   * @static
   * @param {String} key key
   * @return {String} if not exist ,return null
   */
  get: function(key) {
    if (this.isSuppLocalStorage()) {
      return window.localStorage.getItem(key);
    }
    return null;
  },

  //简单的做了一个window.localStorage.getItem 映射
  /**
   * 清除 localStorage
   * @method removeValue
   * @public
   * @static
   * @param {String} key key
   */
  remove: function(key) {
    if (this.isSuppLocalStorage()) {
      return window.localStorage.removeItem(key);
    }
  },

  /**
   * 清除所有localStorage
   * @method clearAll
   * @public
   * @static
   */
  clearAll: function() {
    if (this.isSuppLocalStorage()) {
      return window.localStorage.clear();
    }
  },

  support: function() {
    return this.isSuppLocalStorage();
  },


  /**
   * 判断是否支持localStorage，并且开启
   * @method isSuppLocalStorage
   * @public
   * @static
   * @return {Boolean} ret
   */
  isSuppLocalStorage: function() {
    if (this.supportStorage !== undefined) {
      return this.supportStorage;
    }
    try {
      if (window.localStorage === 'undefined') {
        this.supportStorage = false;
        return false;
      } else {
        var key = 'testSupportKey';
        var support;
        window.localStorage.setItem(key, '1');
        var value = window.localStorage.getItem(key);
        window.localStorage.removeItem(key);
        support = '1' === value ? true : false;

        this.supportStorage = support;
        return support;
      }
    } catch (e) {}
    this.supportStorage = false;
    return false;
  }
};