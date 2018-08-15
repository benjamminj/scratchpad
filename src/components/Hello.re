let component = ReasonReact.statelessComponent("Hello");

let make = _children => {
  ...component,
  render: _self => <span> (ReasonReact.string("Hello")) </span>,
};

[@bs.deriving abstract]
/* let jsProps = {}; */
let jsComponent =
  ReasonReact.wrapReasonForJs(~component, _jsProps => make([||]));