const LoadingMixin = {
    data() {
      return {
        isLoading: false,
      };
    },
    methods: {
      startLoading() {
        this.isLoading = true;
      },
      stopLoading() {
        this.isLoading = false;
      },
    },
  };
  export default LoadingMixin;
  