import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import styles from './Account.module.css';

function Account() {
  const [formOpen, setFormOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [days, setDays] = useState([
    { name: 'Mon', times: [], available: true },
    { name: 'Tue', times: [], available: true },
    { name: 'Wed', times: [], available: true },
    { name: 'Thu', times: [], available: true },
    { name: 'Fri', times: [], available: true },
    { name: 'Sat', times: [], available: true },
    { name: 'Sun', times: [], available: true },
  ]);
  const [questions, setQuestions] = useState([
    { id: 1, name: '', required: false, type: 'One Line' },
    { id: 2, name: '', required: false, type: 'One Line' },
    { id: 3, name: '', required: false, type: 'One Line' },
  ]);
  const [showNewQuestionPopup, setShowNewQuestionPopup] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    name: '',
    required: false,
    type: 'One Line',
    options: [],
  });

  const openForm = () => {
    setFormOpen(true);
    setCurrentStep(1);
  };

  const closeForm = () => {
    setFormOpen(false);
    setCurrentStep(1);
  };

  const handleNextStep = () => {
    setCurrentStep((prevStep) => {
      if (prevStep === 1) {
        return 2;
      } else if (prevStep === 2) {
        return 3;
      } else {
        return prevStep;
      }
    });
  };

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleEventNameChange = (e) => {
    setEventName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const toggleAvailability = (index) => {
    const newDays = [...days];
    newDays[index].available = !newDays[index].available;
    setDays(newDays);
  };

  const addTimeSlot = (dayIndex) => {
    const newDays = [...days];
    newDays[dayIndex].times.push('09:00');
    setDays(newDays);
  };

  const removeTimeSlot = (dayIndex, timeIndex) => {
    const newDays = [...days];
    newDays[dayIndex].times.splice(timeIndex, 1);
    setDays(newDays);
  };

  const phoneFormat = (input) => {
    const number = input.replace(/[^\d]/g, '');
    const match = number.match(/^(\d{3})(\d{3})(\d{4})$/);
    return match ? `(${match[1]}) ${match[2]}-${match[3]}` : input;
  };

  const handlePhoneNumberChange = (index, value) => {
    const formattedPhoneNumber = phoneFormat(value);
    handleQuestionChange(index, formattedPhoneNumber);
  };

  const handleColorSelection = (colorCode) => {
    setSelectedColor(colorCode);
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].name = value;
    setQuestions(updatedQuestions);
  };

  const addNewQuestion = () => {
    setShowNewQuestionPopup(true);
  };

  const closeNewQuestionPopup = () => {
    setShowNewQuestionPopup(false);
    setNewQuestion({
      name: '',
      required: false,
      type: 'One Line',
      options: [],
    });
  };

  const handleNewQuestionChange = (e) => {
    const { name, value } = e.target;
    setNewQuestion((prevQuestion) => ({
      ...prevQuestion,
      [name]: value,
    }));
  };

  const handleQuestionRequiredChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].required = value;
    setQuestions(updatedQuestions);
  };

  const handleNewQuestionRequiredChange = (e) => {
    const { checked } = e.target;
    setNewQuestion((prevQuestion) => ({
      ...prevQuestion,
      required: checked,
    }));
  };

  const handleAddNewQuestion = () => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      { id: prevQuestions.length + 1, ...newQuestion },
    ]);
    closeNewQuestionPopup();
  };

  const removeQuestion = (index) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions.splice(index, 1);
      return updatedQuestions;
    });
  };

  const handleQuestionTypeChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].type = value;
    setQuestions(updatedQuestions);
  };

  const handleNewQuestionOptionChange = (index, value) => {
    const updatedOptions = [...newQuestion.options];
    updatedOptions[index] = value;
    setNewQuestion((prevQuestion) => ({
      ...prevQuestion,
      options: updatedOptions,
    }));
  };

  const removeNewQuestionOption = (index) => {
    const updatedOptions = [...newQuestion.options];
    updatedOptions.splice(index, 1);
    setNewQuestion((prevQuestion) => ({
      ...prevQuestion,
      options: updatedOptions,
    }));
  };

  const handleAddNewQuestionOption = () => {
    setNewQuestion((prevQuestion) => ({
      ...prevQuestion,
      options: prevQuestion.options.length > 0 ? [...prevQuestion.options, ''] : [''],
    }));
  };
  

  const colorOptions = [
    { name: 'Violet', colorCode: '#53129e' },
    { name: 'Blue', colorCode: '#013fa3' },
    { name: 'Green', colorCode: '#008000' },
    { name: 'Red', colorCode: '#ff0000' },
    { name: 'Yellow', colorCode: '#ffff00' },
    { name: 'Orange', colorCode: '#ffa600' },
    { name: 'Pink', colorCode: '#ff69b4' },
    { name: 'Purple', colorCode: '#800080' },
    { name: 'Teal', colorCode: '#008080' },
    { name: 'Gray', colorCode: '#808080' },
  ];

  const handleCreateEvent = () => {
    // Logic to handle event creation
  };

  const renderQuestions = () => {
    return (
      <>
        <div className={styles.question}>
          <label>
            Full Name:
            <input
              type="text"
              value={questions[0].name}
              onChange={(e) => handleQuestionChange(0, e.target.value)}
            />
          </label>
        </div>
        <div className={styles.question}>
          <label>
            Email:
            <input
              type="text"
              value={questions[1].name}
              onChange={(e) => handleQuestionChange(1, e.target.value)}
            />
          </label>
        </div>
        <div className={styles.question}>
          <label>
            Phone number:
            <input
              type="text"
              value={questions[2].name}
              onChange={(e) => handlePhoneNumberChange(2, e.target.value)}
            />
          </label>
        </div>
        <hr />
        {questions.slice(3).map((question, index) => (
          <div className={styles.question} key={index + 3}>
            <label>
              Question:
              <input
                type="text"
                value={question.name}
                onChange={(e) =>
                  handleQuestionChange(index + 3, e.target.value)
                }
              />
            </label>

            <label>
              Required:
              <input
                type="checkbox"
                checked={question.required}
                onChange={(e) =>
                  handleQuestionRequiredChange(index + 3, e.target.checked)
                }
              />
            </label>
            <label>
              Type:
              <select
                value={question.type}
                onChange={(e) =>
                  handleQuestionTypeChange(index + 3, e.target.value)
                }
              >
                <option value="One Line">One Line</option>
                <option value="Multiple Lines">Multiple Lines</option>
                <option value="Dropdown">Dropdown</option>
                <option value="Checkboxes">Checkboxes</option>
                <option value="Radio Buttons">Radio Buttons</option>
                <option value="Phone Number">Phone Number</option>
              </select>
            </label>
            <span
              className={`${styles.removeTimeSlotIcon} ${styles.newQuestionTrashIcon}`}
              onClick={() => removeQuestion(index + 3)}
            >
              <FaTrash />
            </span>
          </div>
        ))}
      </>
    );
  };

  const renderNewQuestionPopup = () => {
    return (
      <div className={styles.newQuestionPopup}>
        <div className={styles.newQuestionPopupHeader}>
          <h3>New Question</h3>
          <span
            className={`${styles.removeTimeSlotIcon} ${styles.newQuestionTrashIcon}`}
            onClick={closeNewQuestionPopup}
          >
            <FaTrash />
          </span>
        </div>
        <div className={styles.newQuestionPopupContent}>
          <label
            className={`${styles.newQuestionLabel} ${styles.questionLabel}`}
          >
            Question:
            <textarea
              name="name"
              value={newQuestion.name}
              onChange={handleNewQuestionChange}
              className={`${styles.biggerQuestionField} biggerQuestionField`}
            />
          </label>
          <label className={styles.requiredLabel}>
            Required:
            <input
              type="checkbox"
              name="required"
              checked={newQuestion.required}
              onChange={handleNewQuestionRequiredChange}
            />
          </label>
          <label className={styles.answerTypeLabel}>
            Answer Type:
            <select
              name="type"
              value={newQuestion.type}
              onChange={handleNewQuestionChange}
            >
              <option value="One Line">One Line</option>
              <option value="Multiple Lines">Multiple Lines</option>
              <option value="Radio Buttons">Radio Buttons</option>
              <option value="Checkboxes">Checkboxes</option>
              <option value="Dropdown">Dropdown</option>
              <option value="Phone Number">Phone Number</option>
            </select>
          </label>
          {['Radio Buttons', 'Checkboxes', 'Dropdown'].includes(
            newQuestion.type
          ) && (
            <div className={styles.newQuestionOptions}>
              {newQuestion.options.map((option, index) => (
                <div key={index} className={styles.newQuestionOption}>
                  <input
                    type="text"
                    value={option}
                    onChange={(e) =>
                      handleNewQuestionOptionChange(index, e.target.value)
                    }
                  />
                  <span
                    className={styles.removeTimeSlotIcon}
                    onClick={() => removeNewQuestionOption(index)}
                  >
                    <FaTrash />
                  </span>
                </div>
              ))}
              <button
                type="button"
                className={`${styles.addOptionButton} ${styles.addButton}`}
                onClick={handleAddNewQuestionOption}
              >
                + Add Option
              </button>
            </div>
          )}
          {['Radio Buttons', 'Checkboxes', 'Dropdown'].includes(
            newQuestion.type
          ) &&
            newQuestion.options.length === 0 && (
              <div className={styles.newQuestionOptions}>
                {[...Array(3)].map((_, index) => (
                  <div key={index} className={styles.newQuestionOption}>
                    <input
                      type="text"
                      value=""
                      onChange={(e) =>
                        handleNewQuestionOptionChange(index, e.target.value)
                      }
                    />
                    <span
                      className={styles.removeTimeSlotIcon}
                      onClick={() => removeNewQuestionOption(index)}
                    >
                      <FaTrash />
                    </span>
                  </div>
                ))}
              </div>
            )}
          <button
            className={styles.applyButton}
            type="button"
            onClick={handleAddNewQuestion}
          >
            Apply
          </button>
        </div>
      </div>
    );
  };

  const renderFormStep = () => {
    if (currentStep === 1) {
      return (
        <form>
          <h3>Step 1/3:</h3>
          <label>
            Event Name:
            <input
              type="text"
              name="eventName"
              value={eventName}
              onChange={handleEventNameChange}
            />
          </label>

          <label>
            Description:
            <textarea
              name="description"
              value={description}
              onChange={handleDescriptionChange}
            />
          </label>
          <label>
            Event Color:
            <div className={styles.colorSelection}>
              {colorOptions.map((color) => (
                <div
                  key={color.name}
                  className={`${styles.colorOption} ${
                    selectedColor === color.colorCode ? styles.selected : ''
                  }`}
                  style={{ backgroundColor: color.colorCode }}
                  onClick={() => handleColorSelection(color.colorCode)}
                />
              ))}
            </div>
          </label>
          <button
            className={styles.nextButton}
            type="button"
            onClick={handleNextStep}
          >
            Next
          </button>
        </form>
      );
    } else if (currentStep === 2) {
      return (
        <form>
          <h3>Step 2/3:</h3>
          <h3>Availability</h3>
          <div>
            {days.map((day, dayIndex) => (
              <div key={dayIndex} className={styles.dayOfWeek}>
                <label>
                  {day.name}:
                  <input
                    type="checkbox"
                    checked={day.available}
                    onChange={() => toggleAvailability(dayIndex)}
                  />
                </label>
                {day.available && (
                  <div className={styles.timeInput}>
                    {day.times.map((time, timeIndex) => (
                      <div key={timeIndex} className={styles.timeSlot}>
                        <input
                          type="time"
                          defaultValue={time}
                          disabled={!day.available}
                        />
                        <span
                          className={styles.removeTimeSlotIcon}
                          onClick={() => removeTimeSlot(dayIndex, timeIndex)}
                        >
                          <FaTrash />
                        </span>
                      </div>
                    ))}
                    <button
                      type="button"
                      className={styles.addTimeSlot}
                      onClick={() => addTimeSlot(dayIndex)}
                    >
                      Add Time Slot
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div>
            <button
              className={styles.previousButton}
              type="button"
              onClick={handlePreviousStep}
            >
              Previous
            </button>
            <button
              className={styles.nextButton}
              type="button"
              onClick={handleNextStep}
            >
              Next
            </button>
          </div>
        </form>
      );
    } else if (currentStep === 3) {
      return (
        <form>
          <h3>Step 3/3:</h3>
          <h3>Questions</h3>
          {renderQuestions()}
          {showNewQuestionPopup && renderNewQuestionPopup()}
          <button
            type="button"
            className={styles.addQuestionButton}
            onClick={addNewQuestion}
          >
            Add New Question
          </button>
          <hr />
          <button
            className={styles.previousButton}
            type="button"
            onClick={handlePreviousStep}
          >
            Previous
          </button>
          <button
            className={`${styles.createButton} ${styles.createButtonStep3}`}
            type="button"
            onClick={handleCreateEvent}
          >
            Create
          </button>
        </form>
      );
    }
  };

  return (
    <div className={styles.account}>
      <div className={styles.header}>
        <h1>Account & Settings</h1>
        <button
          className={`${styles.createButton} ${styles['createButton-independent']}`}
          onClick={openForm}
        >
          + Create New Event
        </button>
      </div>
      {formOpen && (
        <div className={styles.formContainer}>
          <button className={styles.closeButton} onClick={closeForm}>
            Close
          </button>
          {renderFormStep()}
        </div>
      )}
    </div>
  );
}

export default Account;
