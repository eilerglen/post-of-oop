import Section from '../components/Section.js';
import SubmitForm from '../components/SubmitForm.js';
import UserMessage from '../components/UserMessage.js';
import DefaultMessage from '../components/DefaultMessage.js';
import {
  messageList,
  cardListSection,
  formSection
} from '../utils/constants.js';

const cardsList = new Section({
  data: messageList,
  renderer: (item) => {
    const message = item.isOwner
      ? new UserMessage(item, '.message-template_type_user')
      : new DefaultMessage(item, '.message-template_type_default');

    const messageElement = message.generate();

    cardsList.setItem(messageElement);
    },
  },
  cardListSection
);

const form = new SubmitForm({
  selector: '.form-template',
  handleFormSubmit: (formData) => {
    const message = new UserMessage(formData, '.message-template_type_user');

    const messageElement = message.generate();

    cardsList.setItem(messageElement);
  }
});

// отрисовка карточек
cardsList.renderItems();

// инициализация формы
const formRenderer = new Section({
  data: []
}, formSection);

const formElement = form.generate();

formRenderer.setItem(formElement);