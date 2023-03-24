<template>
    <button class="button-23 bg-white text-[#222222] hover:bg-hover-color hover:text-white duration-200" role="button">
        <slot></slot>
    </button>
</template>

<style scoped>
.button-23 {
    border: 1px solid #222222;
    border-radius: 8px;
    box-sizing: border-box;
    cursor: pointer;
    display: inline-block;
    font-size: 16px;
    font-weight: 600;
    line-height: 20px;
    margin: 0;
    outline: none;
    padding: 13px 23px;
    position: relative;
    text-align: center;
    text-decoration: none;
    touch-action: manipulation;
    user-select: none;
    -webkit-user-select: none;
    width: auto;
}
</style>