<template>
    <div class="btn">
        {{label}}
    </div>
</template>

<script>
export default {
    name: 'Button',
    props: {
        label : {
            type: String,
            default:''
        }
    }
}
</script>

<style lang="scss" scoped>
.btn {
    width: 200px;
    background: $yellow;
    padding: 16px 0;
    border-radius: $rounded;
    color: $dark-teal;
    font-weight: bold;
    border: 3px solid $dark-teal;
    cursor: pointer;
}
</style>