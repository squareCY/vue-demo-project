<!-- 首页 -->
<template>
  <div class="bar-content" v-bind:style="{ height: contentHeight + 'px' }">
    <div class="bar-side">
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" :collapse="true">
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">导航一</span>
                </template>
                <el-menu-item-group>
                    <span slot="title">分组一</span>
                    <el-menu-item index="1-1" @click="selectId='1-1'">选项1</el-menu-item>
                    <el-menu-item index="1-2" @click="selectId='1-2'">旅游足迹</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分组2">
                    <el-menu-item index="1-3" @click="selectId='1-3'">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="1-4">
                    <span slot="title">选项4</span>
                    <el-menu-item index="1-4-1" @click="selectId='1-4'">选项1</el-menu-item>
                </el-submenu>
            </el-submenu>
            <el-menu-item index="2" @click="selectId='2'">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3" @click="selectId='3'" disabled>
                <i class="el-icon-document"></i>
                <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4" @click="selectId='4'">
                <i class="el-icon-setting"></i>
                <span slot="title">导航四</span>
            </el-menu-item>
        </el-menu>
    </div>

    <div class="bar-container" v-show="selectId=='1-3'" v-bind:style="{ width: contentWidth + 'px' }">
        index:1-1
        <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
    </div>

    <div class="bar-container" v-show="selectId=='1-2'" v-bind:style="{ width: contentWidth + 'px' }">
        index:1-2
        <div id="mapChina" :style="{width: '700px', height: '700px'}"></div>
        <div>
            <el-tag
                :key="tag"
                v-for="tag in dynamicTags2"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)">
                {{tag}}
                </el-tag>
                <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
                >
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>

            <i class="el-icon-close" @click="dynamicTags2=[];initGeoChart();"></i>
        </div>

        <!-- <div>
            <el-tag
                :key="tag"
                v-for="tag in dynamicTags2"
                closable
                :disable-transitions="false"
                @close="handleClose2(tag)">
                {{tag}}
            </el-tag>
            <el-input
                class="input-new-tag"
                v-if="inputVisible2"
                v-model="inputValue2"
                v-focus="focusInput2"
                size="small"
                @keyup.enter.native="handleInputConfirm2"
                @blur="handleInputConfirm2"
                >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput2()">+ New Tag</el-button>
            <i class="el-icon-close" @click="dynamicTags2=[];initGeoChart();"></i>
        </div> -->
    </div>

    <div class="bar-container" v-show="selectId=='1-1'" v-bind:style="{ width: contentWidth + 'px' }">
        <div id="container" style="height:700px;width:700px"></div>
    </div>

  </div>
</template>

<script>

var vm = null;
import china from 'echarts/map/js/china'
import * as monaco from 'monaco-editor';
export default {
    mounted: function () {
        vm = this;
        this.drawLine();
        this.initGeoChart();
        setTimeout(() => {
            this.initEditor();
        }, 100);
    },
    computed: {
    },
    data() {
      return {
        isCollapse: true,
        contentHeight:window.innerHeight-60,
        contentWidth:window.innerWidth-65,
        selectId:'1-1',
        dynamicTags: ['杭州','宁波','唐山','北京','武汉','苏州','绍兴','天津','秦皇岛','厦门','无锡','南京'],
        dynamicTags2: ['哈尔滨'],
        inputVisible: false,
        inputValue: '',
        bj_map_series : []
      };
    },
    methods: {
        geoData(){
            var geoCoordMap = {
                '上海': [121.4648,31.2891],
                '东莞': [113.8953,22.901],
                '东营': [118.7073,37.5513],
                '中山': [113.4229,22.478],
                '临汾': [111.4783,36.1615],
                '临沂': [118.3118,35.2936],
                '丹东': [124.541,40.4242],
                '丽水': [119.5642,28.1854],
                '乌鲁木齐': [87.9236,43.5883],
                '佛山': [112.8955,23.1097],
                '保定': [115.0488,39.0948],
                '兰州': [103.5901,36.3043],
                '包头': [110.3467,41.4899],
                '北京': [116.4551,40.2539],
                '北海': [109.314,21.6211],
                '南京': [118.8062,31.9208],
                '南宁': [108.479,23.1152],
                '南昌': [116.0046,28.6633],
                '南通': [121.1023,32.1625],
                '厦门': [118.1689,24.6478],
                '台州': [121.1353,28.6688],
                '合肥': [117.29,32.0581],
                '呼和浩特': [111.4124,40.4901],
                '咸阳': [108.4131,34.8706],
                '哈尔滨': [127.9688,45.368],
                '唐山': [118.4766,39.6826],
                '嘉兴': [120.9155,30.6354],
                '大同': [113.7854,39.8035],
                '大连': [122.2229,39.4409],
                '天津': [117.4219,39.4189],
                '太原': [112.3352,37.9413],
                '威海': [121.9482,37.1393],
                '宁波': [121.5967,29.6466],
                '宝鸡': [107.1826,34.3433],
                '宿迁': [118.5535,33.7775],
                '常州': [119.4543,31.5582],
                '广州': [113.5107,23.2196],
                '廊坊': [116.521,39.0509],
                '延安': [109.1052,36.4252],
                '张家口': [115.1477,40.8527],
                '徐州': [117.5208,34.3268],
                '德州': [116.6858,37.2107],
                '惠州': [114.6204,23.1647],
                '成都': [103.9526,30.7617],
                '扬州': [119.4653,32.8162],
                '承德': [117.5757,41.4075],
                '拉萨': [91.1865,30.1465],
                '无锡': [120.3442,31.5527],
                '日照': [119.2786,35.5023],
                '昆明': [102.9199,25.4663],
                '杭州': [119.5313,29.8773],
                '枣庄': [117.323,34.8926],
                '柳州': [109.3799,24.9774],
                '株洲': [113.5327,27.0319],
                '武汉': [114.3896,30.6628],
                '汕头': [117.1692,23.3405],
                '江门': [112.6318,22.1484],
                '沈阳': [123.1238,42.1216],
                '沧州': [116.8286,38.2104],
                '河源': [114.917,23.9722],
                '泉州': [118.3228,25.1147],
                '泰安': [117.0264,36.0516],
                '泰州': [120.0586,32.5525],
                '济南': [117.1582,36.8701],
                '济宁': [116.8286,35.3375],
                '海口': [110.3893,19.8516],
                '淄博': [118.0371,36.6064],
                '淮安': [118.927,33.4039],
                '深圳': [114.5435,22.5439],
                '清远': [112.9175,24.3292],
                '温州': [120.498,27.8119],
                '渭南': [109.7864,35.0299],
                '湖州': [119.8608,30.7782],
                '湘潭': [112.5439,27.7075],
                '滨州': [117.8174,37.4963],
                '潍坊': [119.0918,36.524],
                '烟台': [120.7397,37.5128],
                '玉溪': [101.9312,23.8898],
                '珠海': [113.7305,22.1155],
                '盐城': [120.2234,33.5577],
                '盘锦': [121.9482,41.0449],
                '石家庄': [114.4995,38.1006],
                '福州': [119.4543,25.9222],
                '秦皇岛': [119.2126,40.0232],
                '绍兴': [120.564,29.7565],
                '聊城': [115.9167,36.4032],
                '肇庆': [112.1265,23.5822],
                '舟山': [122.2559,30.2234],
                '苏州': [120.6519,31.3989],
                '莱芜': [117.6526,36.2714],
                '菏泽': [115.6201,35.2057],
                '营口': [122.4316,40.4297],
                '葫芦岛': [120.1575,40.578],
                '衡水': [115.8838,37.7161],
                '衢州': [118.6853,28.8666],
                '西宁': [101.4038,36.8207],
                '西安': [109.1162,34.2004],
                '贵阳': [106.6992,26.7682],
                '连云港': [119.1248,34.552],
                '邢台': [114.8071,37.2821],
                '邯郸': [114.4775,36.535],
                '郑州': [113.4668,34.6234],
                '鄂尔多斯': [108.9734,39.2487],
                '重庆': [107.7539,30.1904],
                '金华': [120.0037,29.1028],
                '铜川': [109.0393,35.1947],
                '银川': [106.3586,38.1775],
                '镇江': [119.4763,31.9702],
                '长春': [125.8154,44.2584],
                '长沙': [113.0823,28.2568],
                '长治': [112.8625,36.4746],
                '阳泉': [113.4778,38.0951],
                '青岛': [120.4651,36.3373],
                '韶关': [113.7964,24.7028]
            };
            var convertData = function (data) {
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    var dataItem = data[i];
                    var fromCoord = geoCoordMap[dataItem[0].name];
                    var toCoord = geoCoordMap[dataItem[1].name];
                    if (fromCoord && toCoord) {
                        res.push({
                            fromName: dataItem[0].name,
                            toName: dataItem[1].name,
                            coords: [fromCoord, toCoord]
                        });
                    }
                }
                return res;
            };
            var BJData = [];
            var PiData = [];
            vm.dynamicTags.forEach(city=>{
                BJData.push([{
                    name: '上海'
                }, {
                    name: city,
                    value: 30
                }]);
            });
            vm.dynamicTags2.forEach(city=>{
                PiData.push([{
                    name: '上海'
                }, {
                    name: city,
                    value: 30
                }]);
            });
            var color = ['#307dc9', '#71dab6', '#71dab6'];
            this.bj_map_series = [];
                [
                    ['w', BJData],['Pi', PiData]
                ].forEach(function (item, i) {
                    vm.bj_map_series.push({
                        name: item[0],
                        type: 'lines',
                        zlevel: 1,
                        label: {
                            normal: {
                                show: true,

                            }
                        },
                        effect: {
                            show: true,
                            period: 6,
                            trailLength: 0.7,
                            color: '#fff',
                            symbolSize: 3
                        },
                        lineStyle: {
                            normal: {
                                color: color[i],
                                width: 0,
                                curveness: 0.2
                            }
                        },
                        data: convertData(item[1])
                    }, {
                            name: item[0],
                            type: 'lines',
                            zlevel: 2,
                            label: {
                                normal: {
                                    show: true,
                                    formatter: function (e) {
                                        return e.data.toName
                                    }
                                }
                            },
                            symbol: ['none', 'arrow'],
                            symbolSize: 10,
                            lineStyle: {
                                normal: {
                                    color: color[i],
                                    width: 1,
                                    opacity: 0.6,
                                    curveness: 0.2
                                }
                            },
                            data: convertData(item[1])
                        }, {
                            // name: item[0] ,
                            type: 'map',
                            // coordinateSystem: 'geo',
                            zlevel: 2,
                            geoIndex: 0,
                            rippleEffect: {
                                brushType: 'stroke'
                            },
                            label: {
                                normal: {
                                    show: true,
                                    position: 'right',
                                    formatter: '{b}'
                                }
                            },
                            symbolSize: function (val) {
                                return val[2] / 8;
                            },
                            itemStyle: {
                                normal: {
                                    color: color[i]
                                }
                            },
                            data: item[1].map(function (dataItem) {
                                return {
                                    name: dataItem[1].name,
                                    value: dataItem[1].value
                                };
                            })
                        });
                });
        },
        drawLine(){
            let myChart = this.$echarts.init(document.getElementById('myChart'))
            // 绘制图表
            myChart.setOption({
                title: { text: '在Vue中使用echarts' },
                tooltip: {},
                xAxis: {
                    data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            });
        },
        initGeoChart(){
            vm.geoData();
            let mapChina = this.$echarts.init(document.getElementById('mapChina'))
            // 绘制图表
            mapChina.setOption({
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    top: 'bottom',
                    left: 'right',
                    data:['w', 'Pi'],
                    selectedMode: 'multiple'
                },
                geo: {
                    map: 'china',
                    roam: true,
                    itemStyle: {
                        normal: {
                            areaColor: '#2b3132',
                            borderColor: '#191a1b'
                        },
                        emphasis: {
                            areaColor: '#000'
                        }
                    }
                },
                series: this.bj_map_series
            });
        },
        initEditor(){
            monaco.editor.create(document.getElementById('container'), {
                value: "// First line\nfunction hello() {\n\talert('Hello world!');\n}\n// Last line",
                language: "javascript",
                readOnly: false,
                wordWrap: 'wordWrapColumn',
                wordWrapColumn: 100,

                // Set this to false to not auto word wrap minified files
                wordWrapMinified: true,

                // try "same", "indent" or "none"
                wrappingIndent: 'indent',
                formatOnType: true,
                glyphMargin: true,
	            theme: "vs-dark",
            });
        },
        handleClose(tag) {
            this.dynamicTags2.splice(this.dynamicTags2.indexOf(tag), 1);
            vm.initGeoChart();
        },

        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },

        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
                this.dynamicTags2.push(inputValue);
                vm.initGeoChart();
            }
            this.inputVisible = false;
            this.inputValue = '';
        },
    }
}
</script>

<style>
.bar-content{
    width: 100%;
}
.bar-side{
    text-align: left;
    height: 100%;
    max-width: 200px;
    float: left;
}
.bar-container{
    float: left;
    height: 100%;
}
.el-menu{
    height: 100%;
}
.el-tag + .el-tag {
    margin-left: 10px;
  }
.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}
.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}
.view-line{
    text-align: left !important;
}
</style>