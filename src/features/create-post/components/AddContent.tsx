interface AddContentPropTypes {
  onBack: () => void;
}

function AddContent({ onBack }: AddContentPropTypes) {
  return (
    <div>
      <input type="text" name="content" />
      <input type="text" name="tag" />
      <button onClick={onBack}>back</button>
    </div>
  );
}

export default AddContent;
