import { IFieldProps } from '../types';

const Field = ({ title, value, clickHandler }: IFieldProps) => {
  return (
    <p className="field">
      <span className="title">{title}:</span>
      {value ? (
        <span className={clickHandler && 'link'} onClick={clickHandler}>
          {value}
        </span>
      ) : (
        'not found:('
      )}
    </p>
  );
};

export default Field;
