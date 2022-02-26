import { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from '~/lib/redux/store';
import { setFormState } from '~/lib/redux/form/slice';

type IProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  buttonText: string;
  inputList: {
    name: string;
    type: string;
    label: string;
    placeholder?: string;
  }[];
};

const Form: FC<IProps> = ({ onSubmit, buttonText, inputList }) => {
  const dispatch = useDispatch();
  const formState = useSelector((state: StoreState) => state.form);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'email') {
      dispatch(
        setFormState({
          ...formState,
          email: value,
        }),
      );
    } else if (name === 'password') {
      dispatch(
        setFormState({
          ...formState,
          password: value,
        }),
      );
    }
  };

  return (
    <form className="mx-auto mt-8 w-full max-w-lg" onSubmit={onSubmit}>
      <fieldset>
        {inputList.map((props, key) => (
          <div key={key} className="mb-5">
            <label htmlFor={props.name}>
              <span>{props.label}</span>
            </label>
            <input
              className="appearance-none border-gray-100 block w-full border-b p-2 focus:outline-none"
              type={props.type}
              id={props.name}
              name={props.name}
              placeholder={props.placeholder}
              onChange={handleChange}
            />
          </div>
        ))}
      </fieldset>
      <div className="text-center">
        <button type="submit" className="bg-blue-500 text-white p-2 hover:opacity-70 transition-all">
          {buttonText}
        </button>
      </div>
    </form>
  );
};

export default Form;
