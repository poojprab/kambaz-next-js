export default function Positions() {
    return (
        <div id="wd-css-position-relative">
        <h2>Relative</h2>
        <div className="wd-bg-color-gray">
            <div className="wd-bg-color-yellow
                            wd-dimension-portrait wd-pos-relative-nudge-down-right">
            <div className="wd-pos-relative-nudge-down-right">
                Portrait</div>
                </div>
            <div className="wd-bg-color-blue 
                            wd-fg-color-white
                            wd-dimension-landscape
                            wd-pos-relative-nudge-up-right">
            Landscape</div>
            <div className="wd-bg-color-red
                            wd-dimension-square">
            Square</div>
        </div>
        <div id="wd-css-position-absolute">
  <h2>Absolute position</h2>
  <div className="wd-pos-relative">
    <div className="wd-pos-absolute-10-10 wd-bg-color-yellow wd-dimension-portrait">
      Portrait</div>
    <div className="wd-pos-absolute-50-50 wd-bg-color-blue wd-fg-color-white 
         wd-dimension-landscape">
      Landscape</div>
    <div className="wd-pos-absolute-120-20 wd-bg-color-red wd-dimension-square">
      Square</div>
  </div><br /><br /><br /><br /><br /><br /><br />
</div>
<div id="wd-css-position-fixed">
  <h2>Fixed position</h2>
  Checkout the blue square that says &quot;Fixed position&quot; stuck all the way on the right and half way down the page. It doesnt scroll with the rest of the page. Its position is &quote;Fixed&quote;.
  <div className="wd-pos-fixed 
    wd-dimension-square wd-bg-color-blue 
    wd-fg-color-white">
    Fixed position
  </div>
</div>
        </div>
    );
}