import React, { useState, useImperativeHandle } from 'react';

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    };
  });

  const content = () => {
    return (
      <div>
        {props.children}
        <input type='button' value='cancel' onClick={toggleVisibility} />
      </div>
    );
  };

  return (
    <div>
      {visible
        ? content()
        : <input type='button' value={props.buttonLabel} onClick={toggleVisibility} />
      }
    </div>
  );
});

Togglable.displayName = 'Togglable';

export default Togglable;