# Machine Learning

[ml5js.org](https://ml5js.org/)

----

## ImageClassifier

**use Mobilnet to recognize the content of images**

```js
let mobilenet
let robin
function setup() {
  createCanvas(640, 480)
  robin = createImg('images/robin.jpg', '', '', () =>
    image(robin, 0, 0, width, height)
  )
  robin.hide()
  background(0)
  mobilenet = ml5.imageClassifier('MobileNet', () => {
    console.log('model is ready')
    mobilenet.classify(robin, (err, res) => {
      if (err) {
        return console.error(err)
      }
      console.log(res)
      let { label, confidence } = res[0]
      createP(label) //p标签
      createP(confidence)
    })
  })
}
```


## Object Detector


**Real-time object detection system using either YOLO or CocoSsd model**


```js
let video
let detector
let detections = []

function preload() {
  // img = loadImage('images/dog_cat.jpg')
  detector = ml5.objectDetector('cocossd')
}
function cp(err, res) {
  console.log(err ?? res)
  detections = res
  detector.detect(video, cp)
}
function setup() {
  createCanvas(640, 480)
  video = createCapture(VIDEO)
  video.size(640, 480)
  video.hide()
  detector.detect(video, cp)
}

function draw() {
  image(video, 0, 0)
  for (let i of detections) {
    stroke(0, 255, 0)
    strokeWeight(3)
    noFill()
    rect(i.x, i.y, i.width, i.height)
    noStroke()
    fill(0)
    textSize(24)
    text(i.label, i.x + 10, i.y + 25)
  }
}
```

## Feature Extractor

**use a part of the pre-trained model: the features for a new custom task**

- `let fe = ml5.featureExtractor('MobileNet',callback)`
  - `let c = fe.classification(?video, ?callback)`
    - `c.addImage(label, ?callback)`
    - `c.train(?callback)`
    - `c.classify((err,res)=>{})`
  - `let c = fe.regression(?video, ?callback)`
    - `addImage train` 同上
    - `c.predict(?callback)`
  - `fe.save(?callback, ?name)`
  - `fe.load(filesOrPath = null, callback)`


```js
let mobilenet
let video
let label = 'unknown'
let classifier
let leftBu
let rightBu
let trainBu

function reClassify(err, res) {
  // console.log(err ?? res)
  label = res[0].label
  console.log(label)
  classifier.classify(reClassify)
}

function setup() {
  createCanvas(640, 520)
  video = createCapture(VIDEO)
  video.hide()
  background(0)
  mobilenet = ml5.featureExtractor(
    'MobileNet',
    console.log('Model Loaded!')
  )
  classifier = mobilenet.classification(
    video,
    console.log('video is ready')
  )

  leftBu = createButton('left')
  leftBu.mousePressed(() => {
    classifier.addImage('left')
  })
  rightBu = createButton('right')
  rightBu.mousePressed(() => {
    classifier.addImage('right')
  })
  trainBu = createButton('right')
  trainBu.mousePressed(() => {
    classifier.train(loss => {
      console.log(loss)
      loss || classifier.classify(reClassify)
    })
  })
}
function draw() {
  background(0)
  image(video, 0, 0)
  fill(255)
  textSize(18)
  text(label, 10, height - 10)
}
```


## KNN Classification

**create a classifier using the K-Nearest Neighbors algorithm**

- `let fe = ml5.featureExtractor('MobileNet', callback)`
  - `let features = fe.infer(img)` 得图片特征
- `let knn = ml5.KNNClassifier()`
  - `knn.addExample(features,label)` 加样本
  - `knn.classify(features,(err,res)=>{})` 分类
  - `knn.clearLabel(indexOrLabel)` `knn.clearAllLabels()` 清除样本
  - `knn.getCountByLabel()` `knn.getCount()` 算样本距离
  - `knn.getNumLabels()` label数量
  - `knn.save('myKNN.json')` `knn.load(path, ?callback)`


```js
let video
let fe
let knn

function setup() {
  createCanvas(640, 520)
  video = createCapture(VIDEO)
  video.hide()
  fe = ml5.featureExtractor('MobileNet', console.log)
  knn = ml5.KNNClassifier()
}

function keyPressed() {
  const logits = fe.infer(video)
  if (key == 'l') {
    knn.addExample(logits, 'left')
    console.log('left')
  }
  if (key == 'r') {
    knn.addExample(logits, 'right')
    console.log('right')
  }
  if (key == 's') {
    knn.classify(logits, (err, res) => console.log(err ?? res.label))
  }
}

function draw() {
  image(video, 0, 0)
}
```


