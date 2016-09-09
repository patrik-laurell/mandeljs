<template lang="jade">
div.col-md-3#panelContainer
  h4 Spacewarp Control Panel
  input(type="text", v-model="iterlimit")
  button.btn.btn-primary(@click="generate") Generate

div.col-md-9#canvasContainer
  canvas#myCanvas(width="width" height="height")
<template>


<script>
  export default {
    name: 'Mandelbrot',

    data () {
      return {
        xmin: -2,
        xmax: 1,
        ymin: -1,
        ymax: 1,
        width: 800,
        height: 600,
        iterlimit: 10
      }
    },

    methods: {
      mandelbrot (c) {
        z = [0,0];
        for (var i=0; i<this.iterlimit; i++) {
          if (Math.pow(z[0]+c[0],2) + Math.pow(z[1]+c[1],2) > 4) {
            break;
          } else {
            z = [Math.pow(z[0],2) - Math.pow(z[1],2) + c[0], 2*z[0]*z[1]+c[1]];
          }
        }
        return i;
      },

      generate () {
        let c = document.getElementById("myCanvas");
        let ctx = c.getContext("2d");
        let imgData = ctx.createImageData(this.width, this.height);
        let pixel = 0;
        let xrange = this.xmax - this.xmin
        let yrange = this.ymax - this.ymin
        for (var i=0; i<imgData.data.length; i+=4) {
          pixel++;
          let x = (pixel % this.width)/this.width*xrange - xrange/2;
          let y = Math.floor(pixel/this.width)/this.height*yrange - yrange/2;
          let iters = this.mandelbrot([x,y]);
          if(iters == this.iterlimit) {
            imgData.data[i+0]=0;
            imgData.data[i+1]=0;
            imgData.data[i+2]=0;
            imgData.data[i+3]=255;
          } else {
            var tmp = 255*iters/this.iterlimit + 100;
            imgData.data[i+0]=tmp;
            imgData.data[i+1]=tmp;
            imgData.data[i+2]=tmp;
            imgData.data[i+3]=255;
          }
        }
        ctx.putImageData(imgData,0,0);
      }
    }
  }
</script>

<style scoped>
  #myCanvas {
    border:1px solid #d3d3d3;
  }
</style>
