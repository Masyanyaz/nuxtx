<template>
    <div class="excursion-head">
        <div class="excursion-head-item">
            <v-icon class="exc-head">alarm</v-icon>
            <div class="excursion-head-item-cont">
                <span class="qqq">Duration</span>
                <span class="www">{{exc.time}}</span>
            </div>
        </div>
        <div class="excursion-head-item">
            <v-icon class="exc-head">group</v-icon>
            <div class="excursion-head-item-cont">
                <span class="qqq">Group Size</span>
                <span class="www">{{exc.groupSize}}</span>
            </div>
        </div>
        <div class="excursion-head-item">
            <v-icon class="exc-head">language</v-icon>
            <div class="excursion-head-item-cont">
                <span class="qqq">Language</span>
                <span class="www">English</span>
            </div>
        </div>
        <div class="excursion-head-item">
            <v-icon class="exc-head">euro_symbol</v-icon>
            <div class="excursion-head-item-cont">
                <span class="qqq">Price</span>
                <span class="www">{{exc.price}}</span>
            </div>
        </div>
    </div>

</template>


<script>
    export default {
        props: ['exc']
    }
</script>

<style scoped lang="scss">
    .header-first {
        @media (max-width: 604px) {
            margin-bottom: 15px;
        }
    }

    .excursion-head {
        display: flex;
        justify-content: space-between;
        padding: 20px 0;
        border-top: 1px solid #D7DCE3;
        border-bottom: 1px solid #D7DCE3;

        &-item {
            display: flex;
            align-items: center;
            @media (max-width: 1000px) {
                width: 50%;
                margin-top: 20px;
            }

            &-cont {
                display: flex;
                flex-direction: column;
            }
        }

        @media (max-width: 1000px) {
            flex-wrap: wrap;
        }
    }

    .qqq {
        font-weight: bold;
    }

    .exc-head {
        margin-right: 15px;
    }
</style>
