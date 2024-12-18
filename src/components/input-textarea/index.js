

const { Component } = wp.element;
import { Button, Dropdown, } from '@wordpress/components'
import { useState, useEffect } from '@wordpress/element'

import { __experimentalInputControl as InputControl, ColorPalette } from '@wordpress/components';



function Html(props) {
  if (!props.warn) {
    return null;
  }



  useEffect(() => {
    //tinymce.execCommand('mceAddEditor', true, props.id);




    tinymce.init({
      selector: "#" + props.id,
      toolbar:
        "undo redo print spellcheckdialog formatpainter | blocks fontfamily fontsize | bold italic underline forecolor backcolor | link image | alignleft aligncenter alignright alignjustify lineheight | checklist bullist numlist indent outdent | removeformat",
      height: "700px",
      setup: (editor) => {
        editor.on("change", (e) => {
          const newContent = editor.getContent(); // Get the updated content

          console.log(newContent);
          props.onChange(newContent);

        });
      }
    });






  }, []);


  return (



    <textarea className={props.className}
      id={props.id}
      value={props.value}
      type="text"
      size={props.size}
      name={props.name}
      placeholder={props.placeholder}
      minlength={props.minlength}
      maxlength={props.maxlength}
      required={props.required}
      disabled={props.disabled}

      onChange={(e) => {
        console.log(e.target.value);

        props.onChange(e.target.value);

      }}>
      {props.value}
    </textarea>








  )

}


class PGinputTextarea extends Component {

  constructor(props) {
    super(props);
    this.state = { showWarning: true };
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(state => ({
      showWarning: !state.showWarning
    }));
  }


  render() {

    var {
      value,
      placeholder,
      className,
      id,
      name,
      size,
      minlength,
      maxlength,
      required,
      disabled,
      onChange,


    } = this.props;







    return (


      <Html value={value} name={name} id={id} size={size} placeholder={placeholder} className={className} minlength={minlength} maxlength={maxlength} required={required} disabled={disabled} onChange={onChange} warn={this.state.showWarning} />


    )
  }
}


export default PGinputTextarea;