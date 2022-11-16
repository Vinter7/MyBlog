# Machine Learning

[ml5js.org](https://ml5js.org/)

----

Script Src:

1. `https://unpkg.com/ml5@latest/dist/ml5.min.js`
2. `https://cdn.jsdelivr.net/npm/p5@1.5.0/lib/p5.js`



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


## Neural Network

**Collect data to train your neural network or use existing data to train your neural network to classification or regression**

1. `let nn = ml5.neuralNetwork(options)`
2. `nn.addData(inputs, outputs)`
3. `nn.normalizeData()`
4. `nn.train()`
5. `.predict()`回归 `.classify()`分类
6. `.saveData()` `.loadData()`
7. `.save()` `load()` *the model*

```js
let model
let target = 'C'
let state = 'collection'

function setup() {
  createCanvas(400, 400)
  let options = {
    inputs: ['x', 'y'],
    outputs: ['label'],
    task: 'classification',
    debug: true,
  }
  model = ml5.neuralNetwork(options)
  background(233)
}

function keyPressed() {
  if (key == 't') {
    model.normalizeData() // 化0-1
    model.train({ epochs: 200 }, () => {
      console.log('finished training')
      state = 'prediction'
    })
  } else {
    target = key.toUpperCase()
  }
}

function mousePressed() {
  let inputs = {
    x: mouseX,
    y: mouseY,
  }

  if (state == 'collection') {
    let outputs = {
      label: target,
    }
    model.addData(inputs, outputs)
    stroke(0)
    noFill()
    ellipse(mouseX, mouseY, 25)
    fill(0)
    noStroke()
    textAlign(CENTER, CENTER)
    text(target, mouseX, mouseY)
  } else if (state == 'prediction') {
    model.classify(inputs, (err, res) => {
      console.log(err ?? res[0].label)
      stroke(0)
      fill('skyblue')
      ellipse(mouseX, mouseY, 25)
      fill(0)
      noStroke()
      textAlign(CENTER, CENTER)
      text(res[0].label, mouseX, mouseY)
    })
  }
}
```

## Pose Net

**PoseNet is a machine learning model that allows for Real-time Human Pose Estimation**

```js
let video
let poseNet
let pose
let skeleton

function setup() {
  createCanvas(640, 500)
  video = createCapture(VIDEO)
  video.hide()
  poseNet = ml5.poseNet(video, console.log('model is ready'))
  poseNet.on('pose', res => {
    // console.log(res)
    pose = res[0]?.pose
    skeleton = res[0]?.skeleton
  })
}

function draw() {
  background(0)
  // 水平翻转
  // translate(video.width, 0) 
  // scale(-1, 1)
  image(video, 0, 0)
  if (pose) {
    fill('red')
    for (let i of pose.keypoints) {
      ellipse(i.position.x, i.position.y, 20)
    }
  }
  if (skeleton) {
    for (const i of skeleton) {
      let a = i[0].position
      let b = i[1].position
      strokeWeight(2)
      stroke(255)
      line(a.x, a.y, b.x, b.y)
    }
  }
}
```


## Pose Classify

```js
let video
let poseNet
let pose
let skeleton
let nn
// 0-waiting 1-collecting 2-load/finish 3-training 4-classify
let state = 1
const map = {
  g: 'good',
  b: 'bad',
}

function setup() {
  createCanvas(640, 500)
  video = createCapture(VIDEO)
  video.hide()
  poseNet = ml5.poseNet(video, console.log('poseNet is ready'))
  poseNet.on('pose', res => {
    // console.log(res)
    pose = res[0]?.pose
    skeleton = res[0]?.skeleton
  })
  let options = {
    inputs: 34,
    outputs: 2,
    task: 'classification',
    debug: true,
  }
  nn = ml5.neuralNetwork(options)
}

function draw() {
  background(0)
  image(video, 0, 0)
  if (pose) {
    fill('red')
    for (let i of pose.keypoints) {
      ellipse(i.position.x, i.position.y, 20)
    }
  }
  if (skeleton) {
    // console.log(skeleton)
    for (const i of skeleton) {
      let a = i[0].position
      let b = i[1].position
      strokeWeight(2)
      stroke(255)
      line(a.x, a.y, b.x, b.y)
    }
  }
}

// g好坐姿数据 b坏坐姿数据 t训练数据并保存模型
// l加载数据 s保存数据  m加载模型 c进行分类

function keyPressed() {
  let inputs = []
  for (let i of pose.keypoints) {
    inputs.push(i.position.x)
    inputs.push(i.position.y)
  }
  switch (key) {
    case 'g':
    case 'b':
      if (state == 1) {
        console.log(key)
        let target = [key]
        nn.addData(inputs, target)
      }
      break
    case 't':
      console.log('training')
      train()
      break
    case 'c':
      nn.classify(inputs, (err, res) => {
        console.log(err ?? map[res[0].label])
      })
      break
    case 'm':
      const model = {
        model: 'model/model.json',
        metadata: 'model/model_meta.json',
        weights: 'model/model.weights.bin',
      }
      nn.load(model, console.log('models loaded'))
      break
  }
}

function train() {
  state = 3
  nn.normalizeData()
  nn.train({ epochs: 100 }, () => {
    // nn.save(`${Date.now()}`)
    nn.save()
    console.log('finished training')
    state = '4'
  })
}
```

