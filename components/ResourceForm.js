import { useState } from "react";

const DEFAULT_DATA = {
  title: "",
  description: "",
  link: "",
  priority: "2",
  timeToFinish: 60
}

const ResourceForm = ({onFormSubmit, initialData}) => {
  /* set form with data  */
  const [form, setForm] = useState(initialData || DEFAULT_DATA);
  /* reset form with default data */
  const resetForm = () => setForm(DEFAULT_DATA)
  /* every input, on change, is "updated" with the data inside it. */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    })
  }

  /* on submit, is created a new resource with data in form // (onFormSubmit) -> pages/resources/new -> createResource() */
  const submitForm = () => {
    onFormSubmit(form);
  }

  return (
    <div className="resource-form">
      <h1 className="title">Add New Resource</h1>
      <form>
        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input
              value={form.title}
              onChange={handleChange}
              name="title"
              className="input"
              type="text"
              placeholder="Learn Next JS and Sanity IO" />
          </div>
        </div>
        <div className="field">
          <label className="label">Description</label>
          <div className="control">
            <textarea
              value={form.description}
              name="description"
              onChange={handleChange}
              className="textarea"
              placeholder="Learn these technologies because they are very popular and enable better SEO"></textarea>
          </div>
        </div>
        <div className="field">
          <label className="label">Link</label>
          <div className="control">
            <input
              value={form.link}
              onChange={handleChange}
              name="link"
              className="input"
              type="text"
              placeholder="https://academy.eincode.com" />
          </div>
        </div>
        <div className="field">
          <label className="label">Priority</label>
          <div className="control">
            <div className="select">
              <select
                value={form.priority}
                onChange={handleChange}
                name="priority"
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>
          </div>
        </div>
        <div className="field">
          <label className="label">Time to finish</label>
          <div className="control">
            <input
              value={form.timeToFinish}
              onChange={handleChange}
              name="timeToFinish"
              className="input"
              type="number"
              placeholder="60" />
          </div>
          <p className="help">Time is in minutes</p>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button
              type="button"
              onClick={submitForm}
              className="button is-link">Submit</button>
          </div>
          <div className="control">
            <button
              onClick={resetForm}
              type="button"
              className="button is-link is-light">Reset Form</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ResourceForm;
