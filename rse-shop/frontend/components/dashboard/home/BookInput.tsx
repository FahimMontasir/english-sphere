import Button from '../../common/Button';
import Filter from '../../common/Filter';
import Icon from '../../common/Icon';

const classes = {
  smallInput:
    'placeholder-gray-600 h-[60px] w-full rounded-rounded-md bg-bgwhite p-[22px] text-black-c focus:outline-none'
};

const BookInput = () => {
  return (
    <div className="flex flex-wrap justify-center gap-3 md:justify-evenly">
      <section className="flex w-[230px] flex-col gap-[15px]">
        {/* image input */}
        <label
          htmlFor="dropzone-file"
          className="flex h-[150px] w-full cursor-pointer items-center justify-center rounded-rounded-md bg-bgwhite"
        >
          <Icon name="camera" className="h-[100px] w-[100px] fill-black-c" />
          <input
            // onChange={e => console.log('file', e.target.value)}
            id="dropzone-file"
            type="file"
            className="hidden"
          />
        </label>

        <input
          type="text"
          placeholder="Title..."
          className={classes.smallInput}
        />

        <input
          type="number"
          placeholder="Price..."
          className={classes.smallInput}
        />

        <textarea
          placeholder="Description..."
          className={`${classes.smallInput} h-[125px]`}
        />
      </section>

      <section className="flex w-[230px] flex-col gap-3">
        <input
          type="text"
          placeholder="Author Name..."
          className={classes.smallInput}
        />
        <Filter />
        <Filter placeholder="Banner" />
      </section>

      <section className="flex flex-col gap-3">
        <Button className="h-[50px] w-[150px]" variant="outlined">
          Publish
        </Button>
        <Button className="h-[50px] w-[150px]" variant="outlined">
          Preview
        </Button>
      </section>
    </div>
  );
};
export default BookInput;
