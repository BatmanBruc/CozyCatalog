<template>
    <div class="product-page">
        <div class="product-page__wrapper">
            <div class="product-page__head">
                <div class="product-page__b-back" @click="back()">
                    <back/>
                </div>
                <input class="product-page__title" v-model="name" @keydown.enter="changeName(name)" @change="changeName(name)"/>
            </div>
            <div class="product-page__img-box">
                <div class="product-page__img">
                    <img :src="file" alt="">
                </div>
                <div class="product-page__b-img">
                    <label>Изменить изображение<input style="display:none;" type="file" name="f" ref="file" v-on:change="onFileChange()"></label>
                </div>
            </div>
            <div class="product-page__price-box">
                <input class="product-page__price" v-model="price"/>
                <span class="product-page__currency">₽</span>
            </div>
            <div class="product-page__status-box">
                <div class="product-page__status" :class="{ 'product-page__status--sales' : statusSale}">{{ statusSale ? 'Продано' : 'В наличии' }}</div>
                <div class="product-page__b-return" v-if="statusSale" @click="reeturn()" >Вернуть</div>
                <div class="product-page__b-sale" v-if="!statusSale" @click="sale()" >Продать</div>
            </div>
            <div class="product-page__description-box">
                <textarea @keydown.enter="changeDescription(description)" @change="changeDescription(description)" v-model="description" name="desc" type="text" placeholder="Описание..." class="product-page__description"></textarea>
            </div>
        </div>
    </div>
</template>



<script>
import Product from '../models/Product.js'
import back from './../assept/icons/back.vue'
export default {
  components:{
      back
  },
  name: 'finance',
  props: {
    id: {
      type: Number,
      default: null,
    },
    name: {
      type: String,
      default: '',
    },
    file: {
      type: String,
      default: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAyAAAAJYCAMAAACtqHJCAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA25pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxNmFlYWM5Yy0xYzRjLTRhNzAtOTM1MC1iNWFlNTM2NGZjNTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6M0EyQTVERkEzMTNEMTFFNkFENUU5MTFDMjUwMEJFMDEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6M0EyQTVERjkzMTNEMTFFNkFENUU5MTFDMjUwMEJFMDEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1ODZBRTA0MkQxMzdFNjExOTUwMkFDNEY5QzBDNjEyNSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxNmFlYWM5Yy0xYzRjLTRhNzAtOTM1MC1iNWFlNTM2NGZjNTYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5AA2PAAAAAGFBMVEVxcXH///+srKyDg4PLy8vk5ORpaWnx8fG7PUG2AAAYqUlEQVR42uzdjYKiNhhGYTYk5P7vuCoICeAPCtPReU637Y6joJDDmy8BbP4BuEljEwAEAQgCEAQgCEAQgCAAQQCCAAQBQBCAIABBAIIABAEIAhAEIAhAEIAgAAgCEAQgCEAQgCAAQQCCAAQBCAKAIABBAIIABAEIAhAEIAhAEIAgAEEAEAQgCEAQgCAAQQCCAAQBCAIQBABBAIIABAEIAhAEIAhAEIAgAEEAggAgCEAQgCAAQQCCAAQBCAIQBCAIAIIABAEIAhAEIAhAEIAgAEEAggAEAUAQgCAAQQCCAAQBCAIQBCAIQBCAIDYBQBCAIABBAIIABAEIAhAEIAhAEAAEAQgCEAQgCEAQgCAAQQCCAAQBCAKAIABBAIIABAEIAhAEIAhAEIAgAAgCEAQgCEAQgCAAQQCCAAQBCAIQBABBAIIABAEIAhAEIMjvI4bgT/Uns4EgI7npuq7xZ/rTJDYQZBKk7RpUEIQgpSCMIAhBJAhBCCJBCEIQCUIQgkgQghBEghCEIBKEIASRIAQhiAQhCEEkCAhCEAlCEIJIEIIQRIIQhCA/miDdH4cgBLmbIG34W7Tzf1wwRZB7CXJqH3/qDwiyKUH0MECQOwlCEBBEgoAgEgQEkSAgiAQBQSQICCJBQBAJAoL8hQTJmEEQCTL9MjYtKgJBJMj0y9ChhiASpBLE1SH1pQAEkSClIJQgiAS5U4NIEIJIEF0sghBEDUIQgqhBCEIQNQhBCKIGIQhB1CAEIYgahCAEUYMQhCBqEIIQRIIQhCAEUYMQhCBqEIIQ5CdrkC6kv8VyAxBEgtwT5I9tHYIQZEsN0oU/dk120MUiyIYaRIIQRILoYkkQgqhBJAhB1CAShCBqEAlCEDWIBCGIGkSCEEQNIkEIogaRIARRg0gQgqhBJAhBJIgaRIIQRA0iQQiiBpEgBFGDvPhhUwwn2hBifKqzKEEI8mdqkBxPH2f6rqimDY+/rlSCEOSP1CApnOToP8T0edooQQiiBjnr0XWrN6B4oIgEIcgfqEFybLrb9ynJEoQgf7oGOX3EO7cv6pooQQjyh2uQ1D64u1cXJQhB/mwNcqd79fhjSRCCfHkNkp66Y2KQIAT5kzXIw/7V/V6WBCHId9cg7bN3F04ShCB/rwZ5+vsbujZLEIL8tRokNU+z/tEkCEG+uQZpt3x9Q5IgBPlbNcimrzdZ/WwShCBfXIO0274dJ0kQgvylGiRt82Ptw0kQgvxUDXK+VunJy5R2YuNXkHatBCHI/1WDpLbpLhdkhPj/qf/IkCRBCPK/1CA5jOfTdl2bfuaTpa3fQLry6SQIQX6gBknV+YJd8zOtbPtX9LYShCD/Qw2yOJ/2xrT1/1uCrBYhEoQgh9cga+eb/4Qh7fYveU8ShCA/XYOkDac+HWv+C1W6BCHIwTXIjbGk4w15RZAoQQjywzXIrUrg8NO6crOHIBKEIIfWIDeHkrqj21qSIAT59TVIunNBeBd/+INJEIL8shok3xtqPXjG8BVBjGIR5EdrkHjvhlRHlyHbu1iNUSyC/GQN8uAg3h3byXphojBLEIL8YA3yqIl2zZEREs2kE+RX1yCPB1oPbW+bT1ZcOUdMghDkuBrkiT7OkZ2sXU53lyAEOaoGeeqCvvYXFSErk/sShCCH1SBPtc8jI2RjH2v1klsJQpCDapD86sjRfmzsY6XHkhNEguxVgzzZwTmyycV3A0SCEOSoGuTZk2l/T4SkJywniATZqYv19CzEkW3u/VuPShCCHFKDbBljPTBCnh/Iap96PUEkyD41SHz32L1XJ+udDpYEIchRNcimOYgDI+TdL9CRIAQ5ogZJTfdLIuSpd3JzNkaCEOSQGmTbJPah16c/NuTOjbokCEGOqEE23jDh2NPeH/Wy7n1RugQhyBE1SNx62+hDr5xKd/Osa+PzSUgQCbJHF2vraYIHX57+L9wMkVP36p6cEoQgB9Qg2++40x78KVNYrUS6po2bTCeIBNmhBtl+2+jm8C9FSKcUqa+QP/308LsYJAhBDqhBXrifyA80vBxDe7LiShPC47uqSBCC7F+DpOYFfuRLQ/L5a64uxPRUFkoQguxfg4TtPayfbHn53+vn7BNEgrxfg7SvJEj7K7+BXYIQZPca5KUeVtfFXymIBCHI3jXIKz2s9e+YlSAE+cIapH1JkB8Y6ZUgBPkFNUh6TY/f2fYkCEH2rkHCiwHSNekXCiJBCLJzDdI2XxQhEoQgO9cguXmZXzjSK0EIsnMNEruXBfmFI70ShCD71iA5dG9EiAQhyJfXILl5Q5DfV6ZLEILsW4PEd/z4fc1PghBk3xrknR7WsTcAkiAE+QU1SPuWIL+u/UkQguxag6T3AuTXnZAlQQiyaw3yZg/r1430ShCC7FqDvC3Iqw0whrYNYXe9JAhB9qxBUvMmXffSSG88W36+0LyN+5b5EoQge9YgsXnbkPBSM+5GwdpdU0SCEGTPGuTdHtZLI72zyfttX1UtQQjygzVI+74f28v0UN/u6u69diUIQf7HGiQ1OwjSbvZjuZDdmrEEIciONUjsmh+PkHTo3bAlCEF2rEH2KEG2ntO7PnW/1+WJEoQg+9Ugud1FkE1t+3Zo7VKISBCC7FeDpF302NQI850ZlT3asgQhyH41SNwnQLZEyL1O3R7jvRKEILvVIDl0Px0h6f6s/PuGSBCC7FeDtHslyNOThQ+UfH8wS4IQZLcaJO2lx9PN8OEau/bNwSwJQpDdapDdSpCnbwD0uE/3riEShCC71SCh++EIeSay3jREghBkrxok71eCPBkhTxn53pShBCHIXjXIfiXIkw0x7T9qLEEIclgNsmMJ8txA1rNduncyRIIQZK8aJHQ/GyFb7g/xsiEShCB71SDtvgnysFFvuPbk9QyRIATZqQbJzc48OKk37qubBCHIsTXIziXIo9Nx87aLF18d7ZUgBNmpBgl7C3L/PJGtq3vREAlCkJ1qkHbvALk/ZPaCb68YIkEIsk8NkvcX5M7Ft69MSr505qIEIcg+NUjqmgNIe8bVK4ZIEILsU4PEQwS50aRfrXe2GyJBCLJPDRIOEWR9fS+va3vzliAE2acGaY8RZGWFb1y4uP06dQlCkF1qkNQcxOI+cqntunciSYIQ5H+oQY4pQfrCoRzLSqF5c03bWrgEIcguNUg4zI+TECFd1ppTfFuPrTdulCAE2aUGCcclyFmR85fjtG3TdXssbIshEoQgu9Qg7ZGCNP2X4/zYecIShCA71yCp+SC6N25MRxAJ8koNEruPMuT5CUMJQpA9apDwUYJsmFKXIATZowb5NEGebucShCA71CC5/TRBnm3oEoQgO9Qgqfk4nmzpEoQgO9QgsftAQ56aDpEgBNmhBgkfKMhzX0ElQQiyQw3ymYI8cw2uBCHI+zXIx9Xoz0+HSBCCvF+DpOZDefx9uhKEIO/XIPFTBXnc3CUIQd6vQT6zBHmqvUsQgrxfg3yuIA+HsiQIQd6vQdoPFuTBmb0ShCBv1yDpkwV5cMNFCUKQt2uQ9MkBsvEWwASRIJtrkPjRgjz4YlIJQpB3a5Dw4YJs+dosgkiQzV2stvlw7py3KEEI8nYN0nYfb0iSIAQ5qgZJzcdzeyhLghCkvXM4faYGid03GJIlCEGeS5BuYxcrNF/AzYvtJQhBmjcF6b7YEAlCkLsJ8kQN0jbfQZQgBDmgBsnfIsjqWVkShCBv1iDpW/xYLdQlCEHerEFi9zWGPFFgEUSCbKxBQtN8sSEShCBv1iCh+yJDogQhyM41SNt8E0mCEGTXGuTk1zcxL9QlCEHeq0Fy24Yv+tNGCUKQXWuQ70aCEOTdc7G+WxAJQpCGIBKEIAfVIBKEIGoQCUKQPyvIv3QiF/+mrH1IEII4gNoABNn/AKoGIQjUIBKEINqHBCEIQWwAgqhBJAhB1CAShCDahwQhCEFsAIKoQSQIQf5cDdK04U8RW4IQZEMP44/RdQ1BCEKQ929yTRA1CAiCRzUIQQgCXSyCEIQgBCGIGoQgBFGDEIQgulgEIQhBCEIQNQhBCKIGIQhBdLEIQhCCgCAEUYMQhCAvJAhqCIKySA+YXUJFEOAm+R9BABAEIAhAEIAgAEEAggAEAQgCEAQAQQCCAAQBCAIQBCAIQBCAIABBAIIAIAhAEIAgAEEAggAEAQgCEAQgCACCAAQBCAIQBCAIQBCAIABBAIIABAHw+wXJKadnHnt+gedX5xTbEOxzfLwgsW3b2ZfXp3b52JNyxBDaK03Idjq+QZBZXFyad3ptWU07CRLtc3y+IM08LfoMeOHoP4RHM/zRw8I3JkhqX0yQ0KdHuBBjssfxhQmShw5SfsW0Nio78N0Jci2yNwdAUJXj+xPk0sEKLyRIerGwBz4pQS5+1I/ldCoo5m1/8WA8BchdgdJaWZIvD6dNNq6+n+1c1pzffcoOb2mnz3PwIiXI1MGqHkuhH5kK5aBtHB/MxSvjMBFyKtELvU4/p2EpsxolnxczVPZ5fPK1n3aeaUzX9xDaOF91KMJr+nX/UxreUvmkYtHnFYV+zeFmM1o85fSGZv/k+SbK1+fVh47TM9Pixal+8bBpVp+Xi5+v23ZlLeMbne2dMF/kL+0Kf0CCpL76KB5Lw+47N5SirfVDued/01SCpPOuGR4e98FpAU26TJA0s9rmlDnNtPQ4rm1od+H022tbaK7xlEMzDiSPi0pNOedytjsOSzjJPjb38xvI9aqb6mMttktzHbbuP0ws5nj6X6TqLZ2WeWmi508cStHOP6b5i6/vcdoCl88T156XypUO4+cra2nrvXPeaOm6HWoI8lqC5KHBTI+l68htM+7S02N9wwrljj6/NMex7U47IQ01zenQFypD4jgoPDWPftFhbDp5GlcL1dsJxaovj8bK+HjtLobyY466xGZcTOnyfLOMn7EffYjNaHn/l4sgvR/DW+oVDE15HEiXKdP5i5te6XB9J9dNUBxKpuel8afh7fy7sZZpE17fT+qfWS+z1cV6LUHC0LCnx8amGce2nS+7KE3dg/GZ5517yvlT/7cwJBca5TB7PJx6+Kd/4rjXUxrXHaa/nFaX8/D6YdV5ekNT45gJEiYlciltHG3P6dzMwg0/zu+ueHOneunMeamx/+tgQ9N3Py+/CUP4xKrXmosXN/WLhw9x+U34t/68fHkzZ+LlKHNZ+tpaxs1abe1+ORfLhmUS5KUEiWXO5+sjYdwDw0FvKhn6fRCKFjjVEtcXpio2psdj2TLLs7/C8Hi5y9PsPdTvLTUPEyQU7y6XnYxcH4hLn2L55uKNUY1YbI2hg9q351wMe4RqrC/WQ4Zrq1x5Xph/7vW1hPKFsVp3cbwgyEsJUsVFuv4l1zupPpPxckxPdT9oNCQud3weO07tYnCgqHpy8VAcF5vrbvd11bcTZKxBUtn3DvUYXbsy/BYXrbqtipO09sb7X4XynS37f5XLYVb/NWH9eXnR0PONtaS6qKpWEH5t8fEhCRLGdjA9lnOa7b96141NKc0q8HF3161revmpsxDqh1M1Hjbuz6kZXLzNy2ZzqwYJ4/lgp7/F8QDa1mVHWJnAmRWytQXNrVZ9ekf9cFpq6uz6t/LmFu2+GnSLtxNk9H5tLbMPU22ZcsyCINsTpOjUr5zh++/aWZ8fh4b2n2cDQrnsIYV/KwfDPB8zSkULnPZ1nCbo532E68+zUayyi1UIf31DaXaeca3XWsutAyXOMqN8cZ7n5HxRcdaPKt9JzjeeVy9k/GFtLWEWh4W/WYK8lSBlC1+e4dvrk5dt5yrMrKM+HWjn7W85sJpzjFX8nI/3Y3FbvPxy6C8Izdjk1xNkaB39Mq4H0P7301LS8h3FmUN5Nh7WrMfJSk7OjzVxXiKk24et9QTJUyG2XEte20TFZg0EeTlBQnGwme/VYRgyzY5JZfcjz8/fuu7ivHKu11ghn0dlwnUioJqN6QeFL4M2oR6JOj/S/2caHO4f7yfS2iJBmuKwWnTdr0vpF7QqSN1yq/LgiX59qgarbzX88KwgeTxJehiYvrWWtLaJshpkhwTpj+F5NUGGUfS47A5P7SW3s/7Ptf+QZrulqJxDW15gVVS+/cj9ZVasqbvs0/UmwxPS0BmfFtPOh3mHs8SuB9AwPm2cs5lX6YtcKJt59ctb/fqig1ll0UKQ/GyCFFsq5FtrSSubaBJEDfJ6gtQlxOwIGoq537wiSJNW9vZ17PVmgsSpQYdUH0zDMLnYzzCmUpDrkf/6vylBmmIqLV5HcEN/+I9FF7xOkOHfZRerfM85NNXGGX95s18fp8mK1VzdniDXZt8UhizWktY2UVaDvJ8goRramSVIfw+GoZ2t1SBp5fhUDjzOEqSflx4mxfuzAeOsBmnjZX+myxkUsehonCrZ/s/1f9dUS1emnnkfavE6wNOUAz3jcvJlWQ8SpNw6TyXI9RWhWebtawlyvgQtxnOXtJkSb76WdGsTSZC3EiTHdjH7lVa61e2NGiSvHA7jlCDV0fj6+qqvUI3pD0saGnIo52nWTxi+NVF4aTe5nJnP90vjO0X6nRok3TrupMWI2aJIb56vQf4tq/TFWvLtc8vUIG8kSJoVqiujWFW7Xasp5kfd0K6OYqXpdIxyTKVoaHEYtA3TsFl7fw/fnSgcBz7Xpg9uMC+00u1RrHY2K3Q9Y3g8A6vNNxt+Lfb5RN6QnpgHKX5arKVtb49UGcV6OUHC7Ng8jhrGaZdd99nKVFRYaVTjQXc2U12ULEWjLnJiPBGkmElvpyZezhucB3X+/bt/suJ0vC8r2rr1h7A2Ubgi+zJB5jPXTXlazGXuJdxOhrw4LDXpcYJUkx3ztYS2KffOeRNF8yBvJ0i70j26zqnNi9O0PPRPx+tct4TrJEWx8LaY8o1VJ6lJ9QKnk1LKEjSUq2iGyfpbXazz88cSZjyA1qu+jJjFm/MYlbMrBUp94s3sjOFFD2vW8MPNRd1LkH931hLnzjXTDlSDvJwgaz3lVLXN4iBfNag47dVU3ipuejxXt5AbG2ecTw5Pw8hNqA/bqYqQ+kXxXheruvhhOoCm+azksrKpnpLDfPnN7GTF5dFiWvuD4rsJq0u6lyDVE2drydWY3OyTSpDXE6TunFZn87bjudN9O0/FebGxvG5pOnd7uMNJMYZfnoA9PRxLR/uf2kWXqOiOpeICv+Jt3J5Jb2dvrxi2jlODWimzpzPi/13OiG9vDnGF8YqS4tNNaw/3BOlfnKZNme+MYg2T/yksWn1VoBTDwLFdPYeLIC8kSPq3miCXfd6EGMsLlIYB2vrBsYGcL4wKRSbl61V5sb5gqr/OKA5T6ddjb31+/bwsuV4NFK93OM3XRnE7QcLKAXS4TGl4R6t3gOw/+Pim879bQ3x5fEvL0zWX7s3P3Qo3Xrw2DzJOjS/ONJ6fzDJtombWG5YgLyXIvIkUZ/MOV3m2iwskhpns5e5u68fTcGFeP8XVTNN+05Wq5x08XC7UTpe7FftzunYkXd9PU0whLrpYzVQVTU2iOIDmUMy6t/HmoOhw4WB94Xo1ilV9kLpALrLlzgByGGf/mlkzb2Yz6e20vcK9tcTpksfZacsS5OVRrLW5kdn2LlvJdG1tfaO4fLkmvamaVN9/jsPOLZ6fY1uI168yFLdfiPVpRMMS+ymbprqLxPLqorQsCS7LGNeeRmVv3rWhf8r8dhVr8yjx2nxjvTFWwml5c6TxxhVVK6+fl8rJ8TC78cViLcPeWbzz0BrmfYX86LHLBO7sMs3cP7h84eXxmJfjwGn5/GohfTe+mPnNVTsofhxWkW99hFz8Ja8vYlr5vRbTPyU/scFWl7U6I/nsi2cfaZocXzvApYd7YdgAvzpA/ugX6Nyd3P1qwoM7hX3SWghyGOmvCpJvljeftxaCSJADDu0/MWj064emCCJBbg1+/MA3CMVv+p4iCfJXPvL1znb589dCEAmyP2ujvp+6FoIcniB/78vYQtP+QMv9mbUQ5GhB4t/7NrYYVk6h/9C1EAQgCEAQgCAAQQCCACAIQBCAIABBAIIABAEIAhAEIAhAEAAEAQgCEAQgCEAQgCAAQQCCAAQBQBCAIABBAIIABAEIAhAEIAhAEIAgAAgCEAQgCEAQgCAAQQCCAAQBCAKAIABBAIIABAEIAhAEIAhAEIAgAEEAEAQgCEAQgCAAQQCCAAQBCAIQBABBAIIABAEIAhAEIAhAEIAgAEEAggAgCEAQgCAAQQCCAAQBCAIQBCAIQBCbACAIQBCAIABBAIIABAEIAhAEIAgAggAEAQgCEAQgCEAQgCAAQQCCAAQBQBCAIABBAIIABAEIAhAEIAhAEAAEAQgCEAQgCEAQgCAAQQCCAAQBCAKAIABBAIIABAEIAhAEIAhAEIAgAAgCEAQgCEAQgCAAQQCCAAQBCAIQBABBAIIABAEIAhAEIAhAEIAgAEEAEAQgCEAQgCAAQYBfw38CDAA0PFheeOELngAAAABJRU5ErkJggg==',
    },
    statusSale: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      default: '',
    },
  },
  data () {
    return {
    }
  },
  created(){
  },
  computed: {
  },
  methods: {
    onFileChange: function(e) {
        let file = this.$refs.file.files;
        if (!file.length)
            return;
        this.createImage(file[0]);
    },
    createImage: function(file) {
        let reader = new FileReader();
        let vm = this;
        reader.onload = function(e) {
            vm.file = e.target.result;
        };
        reader.readAsDataURL(file);
        
    },
    changeName(){
        Product.change(this.id, {
            name: this.name,
            'update_at': Date.now()
        });
    },
    changeDescription(){
        Product.change(this.id, {
            description: this.description,
            'update_at': Date.now()
        });
    },
    sale(){
      this.statusSale = true;
      Product.change(this.id, {
        statusSale: this.statusSale,
        'update_at': Date.now(),
      });
    },
    reeturn(){
      this.statusSale = false;
      Product.change(this.id, {
        statusSale: this.statusSale,
        update_at: Date.now()
      });
    },
    back(){
        this.$emit('close');
    }
  }
}
</script>

<style>
.product-page {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
    background: #fff;
    height: 100%;
    width: 100%;
}
.product-page__wrapper {
    height: 100%;
    overflow: auto;
    padding-bottom: 15px;
    box-sizing: border-box;
}
.product-page__head {
    position: relative;
    height: 55px;
    box-sizing: border-box;
    padding: 1px;
}
.product-page__b-back {
    width: 35px;
    height: 35px;
    margin: 10px;
    border-radius: 30px;
    padding-top: 7px;
    padding-left: 5px;
    box-sizing: border-box;
    border: 1px solid #00c4ff;
    position: absolute;
}
.product-page__b-back svg {
    width: 20px;
    height: 20px;
    fill: #00c4ff;
}
.product-page__title {
    margin-left: 55px;
    height: 31px;
    line-height: 55px;
    font-size: 20px;
    color: #111;
    margin-top: 10px;
    padding-left: 5px;
    border-radius: 4px;
    border: 1px solid #ebebeb;
    width: 100%;
}
.product-page__img-box{
    position: relative;
}
.product-page__img {
    text-align: center;
}
.product-page__img img {
    width: 100%;
}
.product-page__price-box {
    text-align: center;
    margin-top: 15px;
}
input.product-page__price {
    border: 1px solid #ccc;
    border-radius: 4px;
    text-align: end;
    font-size: 29px;
    width: 100px;
    padding-right: 5px;
    text-align: center;
    margin-top: 10px;
}
.product-page__status-box {
    padding: 20px;
    line-height: 50px;
}
.product-page__status {
    display: inline;
    color: #25ad5e;
}
.product-page__b-sale {
    float: right;
    padding: 10px;
    height: 100%;
    padding: 0 5px;
    font-size: 14px;
    border-radius: 24px;
    line-height: 50px;
    width: 100px;
    text-align: center;
    height: 50px;
    background: #00c4ff;
    color: #fff;
}
.product-page__b-return{
  border: 1px solid #ccc;
  background: white;
  float: right;
    padding: 10px;
    height: 100%;
    padding: 0 5px;
    font-size: 14px;
    border-radius: 24px;
    line-height: 50px;
    width: 100px;
    text-align: center;
    height: 50px;
}
textarea.product-page__description {
    width: 98%;
    box-sizing: border-box;
    height: 100%;
    height: 100px;
    padding: 7px;
    box-sizing: border-box;
    margin-left: -3px;
    border-radius: 4px;
    border: 1px solid #ebebeb;
    padding-left: 7px;
}

.product-page__b-img {
    position: absolute;
    bottom: 0px;
    text-align: center;
    width: 100%;
    background: #000000b5;
    padding: 10px;
    color: white;
}
</style>
