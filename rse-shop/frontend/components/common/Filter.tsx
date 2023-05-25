import { useRef, useState } from 'react';
import Button from './Button';
import Icon from './Icon';
import useOutsideClick from '../../hooks/useOutsideClick';

type Props = {
  placeholder?: string;
  value?: string;
  options?: string[];
  buttonVariant?: 'outlined' | 'contained';
  btnStyle?: string;
};

const Filter = ({
  placeholder = 'Filter',
  value,
  options = ['hello', 'mello', 'gello'],
  buttonVariant = 'outlined',
  btnStyle = ''
}: Props) => {
  const filterRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [addNewInput, setAddNewInput] = useState(false);

  useOutsideClick(filterRef, () => setIsOpen(false));

  return (
    <div ref={filterRef} className="relative">
      <Button
        variant={buttonVariant}
        onClick={() => setIsOpen(prev => !prev)}
        className={`${
          value ? 'text-black-c' : 'text-gray-600'
        } w-full justify-between text-[20px] active:!animate-none md:text-[20px] ${btnStyle}`}
      >
        {placeholder}{' '}
        <Icon
          name="dropdown"
          className={`h-[25px] w-[25px] ${
            value ? 'fill-black-c' : 'fill-gray-600'
          } ${isOpen ? 'rotate-180' : ''}`}
        />
      </Button>
      {isOpen && (
        <>
          <div className="absolute right-0 z-20 mt-2 w-[240px] origin-top-right rounded-rounded-md  bg-white-c shadow-[0px_4px_22px_rgba(0,0,0,0.05)] md:w-[320px]">
            <div className="p-3">
              {options.map((option, index) => (
                <button
                  key={option}
                  type="button"
                  className={`${
                    index < options.length - 1 ? 'border-b border-gray-c' : ''
                  } block w-full px-4 py-2 text-left text-[16px] hover:bg-gray-c `}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="relative">
              <Button
                variant="outlined"
                className="h-[30px] w-full rounded-[0px_0px_12px_12px] text-[18px] active:!animate-none md:text-[18px]"
                onClick={() => setAddNewInput(prev => !prev)}
              >
                Add New
              </Button>

              {addNewInput && (
                <input
                  placeholder="Title..."
                  className="absolute right-0 z-20 mt-2 h-[60px] w-[240px] origin-top-right  rounded-rounded-md bg-white-c p-[22px] text-black-c placeholder-gray-600 shadow-[0px_4px_22px_rgba(0,0,0,0.05)] focus:outline-none md:w-[320px]"
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default Filter;
