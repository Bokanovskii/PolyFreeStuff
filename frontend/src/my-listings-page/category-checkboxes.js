export function Catbox(props) {
  return (
    <label className="checkbox-container">
      <input
        type="checkbox"
        name={props.name}
        value={props.value}
        id={`cat-${props.id}`}
        checked={props.selectedCats[props.id]}
        onChange={() => props.handleOnChange(props.id)}
      />
      <div className="checkbox">{props.text}</div>
    </label>
  );
}

function Catlist(props) {
  const handleOnChange = (pos) => {
    const updatedCats = props.selectedCats.map((value, index) =>
      index === pos ? !value : value
    );
    props.setSelectedCats(updatedCats);
  };

  return (
    <div id="cat-select">
      {props.categories.map(({ name, value, text }, index) => {
        return (
          <Catbox
            key={index}
            id={index}
            name={name}
            value={value}
            text={text}
            selectedCats={props.selectedCats}
            handleOnChange={handleOnChange}
          />
        );
      })}
    </div>
  );
}

export default Catlist;
