export default function House() {
  const house = {
    bedrooms: 4,      bathrooms: 2.5,
    squareFeet: 2000,
    address: {
      street: "Via Roma", city: "Roma", state: "RM", zip: "00100",  country: "Italy", },
    owners: ["Alice", "Bob"],
  };
  console.log(house.bedrooms);
  return (
    <div id="wd-house">
      <h4>House</h4>
      <h5>bedrooms</h5>      {house.bedrooms}
      <h5>bathrooms</h5>     {house.bathrooms}
      <h5>squareFeet</h5>     {house.squareFeet}
      <h5>address</h5>     {house.address.street} {house.address.state} {house.address.zip}
      {house.address.country}
      <h5>owners</h5> {house.owners[0]} {house.owners[1]}
      <h5>Data</h5>
      <pre>{JSON.stringify(house, null, 2)}</pre>
      <hr />
    </div>
);}
