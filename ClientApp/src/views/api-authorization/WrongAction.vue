<template>
  <div>Unknown Action: {{action}}</div>
</template>
<script>
export default {
  name: "WrongAction",
  props: {
    action: {
      type: String
    }
  }
};
</script>