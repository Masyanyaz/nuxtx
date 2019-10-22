<template>
  <div class="header">
    <div class="excursion-head">
      <div class="excursion-head-item">
        <svg width="32px" height="32px" viewBox="0 0 34 34" version="1.1" xmlns="http://www.w3.org/2000/svg"
             xmlns:xlink="http://www.w3.org/1999/xlink">
          <desc>Created with Sketch.</desc>
          <defs></defs>
          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round"
             stroke-linejoin="round">
            <g id="Tour_Detail_1" transform="translate(-134.000000, -1005.000000)" stroke="#5191FA">
              <g id="tour-detail" transform="translate(0.000000, 211.000000)">
                <g id="feauture" transform="translate(135.000000, 765.000000)">
                  <g id="Group-3">
                    <g id="Group" transform="translate(0.000000, 25.000000)">
                      <g id="ico_clock" transform="translate(0.000000, 5.000000)">
                        <circle id="Oval" cx="16" cy="16" r="16"></circle>
                        <circle id="Oval" cx="16" cy="17.3333333" r="2.28571429"></circle>
                        <path d="M16,15.047619 L16,7.04761905" id="Shape"></path>
                        <path d="M17.6167619,18.9500952 L21.7142857,23.047619" id="Shape"></path>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </svg>
        <div class="excursion-head-item-cont">
          <span class="qqq">{{$t('Excursion.ExcursionHeader.duration.title')}}</span>
          <span class="www">{{exc.time}} {{$t('Excursion.ExcursionHeader.duration.hours')}}</span>
        </div>
      </div>
      <div class="excursion-head-item">
        <svg width="32px" height="32px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"
             xmlns:xlink="http://www.w3.org/1999/xlink">
          <desc>Created with Sketch.</desc>
          <defs></defs>
          <g id="Hotel-layout" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round"
             stroke-linejoin="round">
            <g id="Room_Detail_1" transform="translate(-544.000000, -803.000000)" stroke="#5191FA">
              <g id="room-detail" transform="translate(0.000000, 211.000000)">
                <g id="Group-3" transform="translate(135.000000, 562.000000)">
                  <g id="Group" transform="translate(409.000000, 30.000000)">
                    <g id="ico_adults">
                      <g id="Group" transform="translate(1.000000, 1.000000)">
                        <g id="Regular">
                          <circle id="Oval" cx="7" cy="4" r="4"></circle>
                          <path
                            d="M14,17 C14,13.1340068 10.8659932,10 7,10 C3.13400675,10 4.4408921e-16,13.1340068 0,17 L0,20 L3,20 L4,30 L10,30 L11,20 L14,20 L14,17 Z"
                            id="Shape"></path>
                          <path
                            d="M16,24 L18,24 L19,30 L25,30 L26,24 L30,24 L27,15 C26,12 24.7613333,10 22,10 C20.1015957,10.0018584 18.4126862,11.2059289 17.792,13"
                            id="Shape"></path>
                          <circle id="Oval" cx="22" cy="4" r="4"></circle>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </svg>
        <div class="excursion-head-item-cont">
          <span class="qqq">{{$t('Excursion.ExcursionHeader.groupSize.title')}}</span>
          <span class="www">{{exc.groupSize}} {{$t('Excursion.ExcursionHeader.groupSize.persons')}}</span>
        </div>
      </div>
      <div class="excursion-head-item">
        <svg width="32px" height="32px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"
             xmlns:xlink="http://www.w3.org/1999/xlink">
          <desc>Created with Sketch.</desc>
          <defs></defs>
          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round"
             stroke-linejoin="round">
            <g id="Tour_Detail_1" transform="translate(-735.000000, -1005.000000)" stroke="#5191FA">
              <g id="tour-detail" transform="translate(0.000000, 211.000000)">
                <g id="feauture" transform="translate(135.000000, 765.000000)">
                  <g id="Group" transform="translate(601.000000, 25.000000)">
                    <g transform="translate(0.000000, 5.000000)" id="Regular">
                      <g>
                        <circle id="Oval" cx="9" cy="5.5" r="5.5"></circle>
                        <path
                          d="M10,13.0773333 C9.66846827,13.0319989 9.33455994,13.0061766 9,13 C4.02943725,13 5.92118946e-16,17.0294373 0,22"
                          id="Shape"></path>
                        <path
                          d="M28,26 L24,26 L18,30 L18,26 L16,26 C14.8954305,26 14,25.1045695 14,24 L14,16 C14,14.8954305 14.8954305,14 16,14 L28,14 C29.1045695,14 30,14.8954305 30,16 L30,24 C30,25.1045695 29.1045695,26 28,26 Z"
                          id="Shape"></path>
                        <path d="M18,18 L26,18" id="Shape"></path>
                        <path d="M18,22 L26,22" id="Shape"></path>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </svg>
        <div class="excursion-head-item-cont">
          <span class="qqq">{{$t('commonWords.languages.title')}}</span>
          <span class="www">{{$t('commonWords.languages.fr')}}</span>
        </div>
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

  .header {
    border-top: 1px solid #D7DCE3;
    border-bottom: 1px solid #D7DCE3;
  }

  .excursion-head {
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
    width: 70%;

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
      width: 100%;
    }
  }

  .qqq {
    font-weight: bold;
  }

  .exc-head {
    margin-right: 15px;
  }

  svg {
    margin-right: 10px;
  }
</style>
