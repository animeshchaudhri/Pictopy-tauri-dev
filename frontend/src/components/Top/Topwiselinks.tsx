function Topwiselinks(props: any) {
  return (
    <div className="flex ">
      <li>{props.location}</li>
      <li>{props.size}</li>
      <li>{props.date}</li>
    </div>
  );
}

export default Topwiselinks;
