import * as React from 'react';
import * as style from './CheckBoxField.scss';

interface OptionWithIcon {
  id: string;
  optionLabel: string;
  optionValue: string;
  icon: {
    imageSelected: string;
    imageUnselected: string;
    width: number;
    height: number;
  };
  hideOptionLabel: boolean;
}

interface Props {
  item: OptionWithIcon;
  isChecked: boolean;
  onChange: (isChecked: boolean, elemId: string) => void;
}

export class CheckBoxInput extends React.Component<Props> {
  renderImage = (imgPath: string, width: number, height: number) => {
    return (
      <img
        src={imgPath}
        width={width || 16 + 'px'}
        height={height || 16 + 'px'}
      />
    );
  };

  onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    item: OptionWithIcon
  ) => {
    const { onChange } = this.props;
    onChange && onChange(event.target.checked, item.id);
  };

  render() {
    const icon = this.props.item.icon || {
      imageSelected: '',
      imageUnselected: '',
      width: 16,
      height: 16
    };

    const { optionLabel, optionValue, hideOptionLabel } = this.props.item;

    const {
      imageSelected, imageUnselected, width, height 
    } = icon;
    const { item, isChecked = false } = this.props;
    return (
      <label>
        <input
          type="checkbox"
          value={optionValue}
          name={optionLabel}
          className={imageSelected && style.hide}
          onChange={event => this.onChangeHandler(event, item)}
          checked={isChecked}
        />
        {isChecked
          && imageSelected
          && this.renderImage(imageSelected, width, height)}
        {!isChecked
          && imageUnselected
          && this.renderImage(imageUnselected, width, height)}
        {!hideOptionLabel && optionLabel}
      </label>
    );
  }
}
