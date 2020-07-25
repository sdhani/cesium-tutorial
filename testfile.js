/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */
const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5NDViZjEzMy04MmUxLTRlMWYtYTQ0ZS01N2RmMTBlMWVmNGEiLCJpZCI6MzA4NzksInNjb3BlcyI6WyJhc2wiLCJhc3IiLCJhc3ciLCJnYyJdLCJpYXQiOjE1OTUyOTAwMTJ9.iHhAjy7lpCyEjQT3b0xmIsXYx6dupbHssoyX__nBr-M";

Cesium.Ion.defaultAccessToken = accessToken;
  
var viewer = new Cesium.Viewer("cesiumContainer", {
  shouldAnimate: true,
});

var dates = [
  "2018-07-19T15:18:00Z",
  "2018-07-19T15:18:00.5Z",
  "2018-07-19T15:18:01Z",
  "2018-07-19T15:18:01.5Z",
  "2018-07-19T15:18:02Z",
  "2018-07-19T15:18:02.5Z",
];

// var uris = [
//   "assets/host-a004_lidar1_1232815252301696606.las",
//   "assets/host-a004_lidar1_1232815252501972246.las",
//   "assets/host-a004_lidar1_1232815252701880486.las",
//   "assets/host-a004_lidar1_1232815252901565726.las",
//   "assets/host-a004_lidar1_1232815253101216366.las",
// ];

// function dataCallback(interval, index) {
//   return {
//     uri: uris[index],
//   };
// }

// var timeIntervalCollection = Cesium.TimeIntervalCollection.fromIso8601DateArray(
//   {
//     iso8601Dates: dates,
//     dataCallback: dataCallback,
//   }
// );

// var pointCloud = new Cesium.TimeDynamicPointCloud({
//   intervals: timeIntervalCollection,
//   clock: viewer.clock,
//   style: new Cesium.Cesium3DTileStyle({
//     pointSize: 5,
//   }),
// });

var pointCloud1 = new Cesium.TimeDynamicPointCloud({
  intervals: timeIntervalCollection,
  clock: viewer.clock,
  style: Cesium.Cesium3DTileset({
      url: Cesium.IonResource.fromAssetId(126599)
  }),
});

var pointCloud2 = new Cesium.TimeDynamicPointCloud({
  intervals: timeIntervalCollection,
  clock: viewer.clock,
  style: Cesium.Cesium3DTileset({
      url: Cesium.IonResource.fromAssetId(126600),
  }),
});

var pointCloud3 = new Cesium.TimeDynamicPointCloud({
  intervals: timeIntervalCollection,
  clock: viewer.clock,
  style: Cesium.Cesium3DTileset({
      url: Cesium.IonResource.fromAssetId(126601),
  }),
});

var pointCloud4 = new Cesium.TimeDynamicPointCloud({
  intervals: timeIntervalCollection,
  clock: viewer.clock,
  style: Cesium.Cesium3DTileset({
      url: Cesium.IonResource.fromAssetId(126602),
  }),
});

var pointCloud5 = new Cesium.TimeDynamicPointCloud({
  intervals: timeIntervalCollection,
  clock: viewer.clock,
  style: Cesium.Cesium3DTileset({
      url: Cesium.IonResource.fromAssetId(126596),
  }),
});

var pointCloud6 = new Cesium.TimeDynamicPointCloud({
  intervals: timeIntervalCollection,
  clock: viewer.clock,
  style: Cesium.Cesium3DTileset({
      url: Cesium.IonResource.fromAssetId(126603),
  }),
});


// var tileset = viewer.scene.primitives.add(
//   new Cesium.Cesium3DTileset({
//     url: Cesium.IonResource.fromAssetId(126599),
//   })
// );

// viewer.scene.primitives.add(pointCloud);

var numberOfSamples = 100;
for (var i = 0; i <= numberOfSamples; ++i) {
  var factor = i / numberOfSamples;
  var time = Cesium.JulianDate.addSeconds(
    start,
    factor * totalSeconds,
    new Cesium.JulianDate()
  );

  // Lerp using a non-linear factor so that the vehicle accelerates.
  var locationFactor = Math.pow(factor, 2);
  var location = Cesium.Cartesian3.lerp(
    startPosition,
    endPosition,
    locationFactor,
    new Cesium.Cartesian3()
  );
  position.addSample(time, location);
  // Rotate the wheels based on how fast the vehicle is moving at each timestep.
  velocityVectorProperty.getValue(time, velocityVector);
  var metersPerSecond = Cesium.Cartesian3.magnitude(velocityVector);
  var wheelRadius = 0.52; //in meters.
  var circumference = Math.PI * wheelRadius * 2;
  var rotationsPerSecond = metersPerSecond / circumference;

  wheelAngle +=
    ((Math.PI * 2 * totalSeconds) / numberOfSamples) *
    rotationsPerSecond;
  wheelAngleProperty.addSample(time, wheelAngle);
}

var start = Cesium.JulianDate.fromIso8601(dates[0]);
var stop = Cesium.JulianDate.fromIso8601(dates[dates.length - 1]);

viewer.timeline.zoomTo(start, stop);

var clock = viewer.clock;
clock.startTime = start;
clock.currentTime = start;
clock.stopTime = stop;
clock.clockRange = Cesium.ClockRange.LOOP_STOP;

viewer.zoomTo(
  // tileset,
  pointData1,
  pointData2,
  pointData3,
  pointData4,
  pointData5,
  pointData6,
  new Cesium.HeadingPitchRange(0.0, -0.5, 50.0)
);

// prints "hi" in the browser's dev tools console
console.log("hi");
