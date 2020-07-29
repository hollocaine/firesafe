const questions = [
  {
    id: 1,
    location_id: 1,
    user_id: 1,
    questions: [
      {
        question_id: '1',
        question: 'Is there a fire extinguisher?',
      },
      {
        question_id: '2',
        question: 'Is there a fire alarm?',
      },
      {
        question_id: '3',
        question: 'Is there a fire hose?',
      },
    ],
  },
  {
    id: 2,
    location_id: 2,
    user_id: 1,
    questions: [
      {
        question_id: '1',
        question: 'Is there a bigger fire extinguisher?',
      },
      {
        question_id: '2',
        question: 'Is there a smaller fire alarm?',
      },
      {
        question_id: '3',
        question: 'Is there a larger fire hose?',
      },
    ],
  },
  {
    id: 3,
    location_id: 3,
    user_id: 1,
    questions: [
      {
        question_id: '1',
        question: 'Get the  hell out theres a fire?',
      },
      {
        question_id: '2',
        question: 'Any marshmallows?',
      },
      {
        question_id: '3',
        question: 'Put the kettle on?',
      },
      {
        question_id: '4',
        question: 'Call the fire brigade?',
      },
    ],
  },
];
const addQuestion = (question) => {
  question.id = questions.length + 1;
  questions.push(question);
};

const getQuestions = () => questions;

const getQuestion = (id) => questions.find((question) => question.id === id);

const filterQuestions = (predicate) => questions.filter(predicate);

module.exports = {
  addQuestion,
  getQuestions,
  getQuestion,
  filterQuestions,
};
