const LoadingDirective = {
    mounted(el, binding) {
      const loader = binding.value;
      const mixin = {
        methods: {
          setLoading() {
            this.$emit("startLoading");
            loader.style.display = "block";
          },
          unsetLoading() {
            this.$emit("stopLoading");
            loader.style.display = "none";
          },
        },
      };
      el.mixin(mixin);
      el.addEventListener("before-enter", this.setLoading);
      el.addEventListener("before-leave", this.unsetLoading);
    },
    unmounted(el) {
      el.removeEventListener("before-enter", this.setLoading);
      el.removeEventListener("before-leave", this.unsetLoading);
    },
  };
  export default LoadingDirective;
  