import React from 'react';

import { Button, Tooltip } from 'flowbite-react';


export default function DefaultToolTip({ 
    content, 
    text, 
    animation,
    arrow,
    trigger,
    placement,
    style,
    tooltipClass,
    buttonClass
}) {
  return (
    <Tooltip 
        content={content} 
        animation={animation}
        arrow={arrow}
        trigger={trigger}
        placement={placement}
        style={style}
        className={tooltipClass}
    >
      <Button className={buttonClass}>
        {text}
      </Button>
    </Tooltip>
  )
}


