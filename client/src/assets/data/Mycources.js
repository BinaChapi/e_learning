import FX from '../images/Forex.png';
import sport from '../images/sport.png';
import food from '../images/food.png';
import history from '../images/history.png';

export const myCourse = [
  {
    title: "FX Market",
    img: FX,
    donePercentage: 29,
    liked: true,
    NoLikes: 222,
    lessons: [
      { lessonNumber: 1, finished: true, videos: 10, finishedVideos: 10 },
      { lessonNumber: 2, finished: true, videos: 8, finishedVideos: 7 },
      { lessonNumber: 3, finished: false, videos: 6, finishedVideos: 0 },
      { lessonNumber: 4, finished: false, videos: 7, finishedVideos: 0 }
    ]
  },
  {
    title: "Sports",
    img: sport,
    donePercentage: 59,
    liked: false,
    NoLikes: 222,
    lessons: [
      { lessonNumber: 1, finished: true, videos: 12, finishedVideos: 12 },
      { lessonNumber: 2, finished: true, videos: 9, finishedVideos: 7 },
      { lessonNumber: 3, finished: false, videos: 5, finishedVideos: 0 },
      { lessonNumber: 4, finished: false, videos: 6, finishedVideos: 0 }
    ]
  },
  {
    title: "Food",
    img: food,
    donePercentage: 30,
    liked: true,
    NoLikes: 222,
    lessons: [
      { lessonNumber: 1, finished: false, videos: 10, finishedVideos: 0 },
      { lessonNumber: 2, finished: false, videos: 10, finishedVideos: 0 },
      { lessonNumber: 3, finished: false, videos: 8, finishedVideos: 0 },
      { lessonNumber: 4, finished: false, videos: 7, finishedVideos: 0 }
    ]
  },
  {
    title: "History",
    img: history,
    donePercentage: 10,
    liked: false,
    NoLikes: 222,
    lessons: [
      { lessonNumber: 1, finished: true, videos: 12, finishedVideos: 14 },
      { lessonNumber: 2, finished: false, videos: 11, finishedVideos: 0 },
      { lessonNumber: 3, finished: false, videos: 9, finishedVideos: 0 },
      { lessonNumber: 4, finished: false, videos: 10, finishedVideos: 0 }
    ]
  }
];
