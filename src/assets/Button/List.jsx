function List() {
    const fruits = [
      { name: "Apple", calories: 95 },
      { name: "Ball", calories: 104 },
      { name: "rCat", calories: 67 },
      { name: "Dine", calories: 89 }
    ];
  fruits.sort();
    const listItems = fruits.map(fruit => (
      <li key={fruit.name}>
        {fruit.name} - {fruit.calories} calories
      </li>
    ));
  
    return <ol>{listItems}</ol>;
  }
  
  export default List;
  