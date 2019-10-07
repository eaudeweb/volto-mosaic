import React, { Component } from 'react';
import { Menu, Form as UiForm, Grid } from 'semantic-ui-react';

class TileStyleSelectWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
    };
    this.handleClick = this.handleClick.bind(this);
    console.log('props in style select', props);
  }

  handleClick(e, data) {
    this.setState({ value: data.name }, () => {
      this.props.onChange(this.props.id, data.name);
    });
  }

  render() {
    const { id, title } = this.props;
    // const selected = this.state.value;
    return (
      <UiForm.Field inline required={this.props.required}>
        <Grid>
          <Grid.Row>
            <Grid.Column width="4">
              <label htmlFor={`field-${id}`}>{title}</label>
            </Grid.Column>
            <Grid.Column width="8">
              <Menu vertical>
                {this.props.options.map(style => {
                  const [opttitle, optid] = style.split('|');
                  return (
                    <Menu.Item
                      name={optid}
                      active={optid === this.state.value}
                      onClick={this.handleClick}
                      key={optid}
                    >
                      {opttitle}
                    </Menu.Item>
                  );
                })}
              </Menu>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </UiForm.Field>
    );
  }
}

export default TileStyleSelectWidget;