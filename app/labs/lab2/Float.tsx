import "./index.css";

export default function Float() {
  return (
    <div id="wd-float-divs">
      <h2>Float Example</h2>

      <div>
        <img
          className="wd-float-right"
          src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
          alt="Starship"
        />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sagittis tellus mattis sem iaculis blandit. Suspendisse tincidunt lorem vulputate, rutrum felis at, sagittis sem. Cras elementum nisl eu purus vestibulum, non interdum nisl interdum. Proin efficitur a massa lacinia venenatis. Nulla placerat nec ipsum eget vehicula. Proin a turpis non diam fermentum condimentum. Suspendisse potenti. Mauris erat nisi, pellentesque placerat tempus sed, finibus sit amet ex.
        </p>
        <img
          className="wd-float-left"
          src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
          alt="Starship"
        />
        <p>
          Sed cursus fermentum eros sit amet efficitur. Ut laoreet ornare felis, at malesuada sem malesuada in. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse viverra lectus et posuere semper. Aenean interdum varius dui eu vulputate. Curabitur nec sagittis augue. Sed at eros hendrerit, ultricies augue et, consequat urna. Mauris pellentesque tellus eget tempor posuere. Cras dapibus in sapien quis posuere. Nulla porta accumsan elit quis mollis. Aliquam fringilla arcu eu rhoncus elementum. Donec ut iaculis orci, ut venenatis augue. Vestibulum quam metus, tempor id mattis sit amet, fermentum eu sapien. Cras lacinia, massa sit amet venenatis dapibus, turpis enim vehicula ex, vel iaculis sapien elit at ex. Maecenas pretium risus lacus, id lacinia mauris bibendum sit amet. Praesent arcu ligula, sagittis sed massa mollis, dignissim venenatis quam.
        </p>
        <img
          className="wd-float-right"
          src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
          alt="Starship"
        />
        <p>
          Phasellus quis faucibus elit, in ultricies elit. Vestibulum commodo massa ac lacus consequat, vitae sodales erat vestibulum. Aliquam a iaculis mi, nec rutrum est. Vivamus dapibus velit id dapibus porttitor. Proin aliquam quam nec suscipit elementum. Curabitur sed ligula vehicula ipsum feugiat gravida. Sed mattis mauris quis libero pulvinar suscipit. Suspendisse bibendum faucibus lorem ac lobortis. Aenean condimentum ac nisl posuere varius. Donec scelerisque lacinia augue, quis euismod lorem scelerisque at. Pellentesque eget nisl ac leo pharetra commodo quis in mauris. Maecenas nisl nibh, aliquet non lacus quis, egestas tincidunt orci. Cras rhoncus, nibh in dapibus mattis, nisi enim tempus lacus, eget lacinia tortor neque et urna. Mauris vitae purus purus. Nulla turpis leo, fringilla nec sodales sed, semper non eros.
        </p>
        <img
          className="wd-float-left"
          src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
          alt="Starship"
        />
        <p>
          Ut consectetur risus dignissim nibh vehicula, vel dapibus nisl facilisis. Maecenas non lectus tristique, pretium risus id, vehicula sapien. Nullam cursus mauris malesuada tortor cursus fringilla. Donec et neque turpis. Morbi tempus, leo et ultrices ultrices, augue libero fringilla eros, vestibulum egestas sem dui in velit. Maecenas sed cursus orci. Vivamus sollicitudin quam sem. Donec ligula ante, sollicitudin eu sagittis in, ornare nec erat.
        </p>

        <div className="wd-float-done"></div>
      </div>

      <div>
        <div className="wd-float-left wd-dimension-portrait wd-bg-color-yellow">
          Yellow
        </div>
        <div className="wd-float-left wd-dimension-portrait wd-bg-color-blue wd-fg-color-white">
          Blue
        </div>
        <div className="wd-float-left wd-dimension-portrait wd-bg-color-red">
          Red
        </div>
        <img
          className="wd-float-right"
          src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
          alt="Starship"
        />
        <div className="wd-float-done"></div>
      </div>
    </div>
  );
}
