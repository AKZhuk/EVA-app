import { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { IRace, IState } from '../../types';
import Field from '../Field';

class PopUpCEOView extends Component<props, { raceName: string }> {
  constructor(props: props) {
    super(props);
    let race = this.props.races.find((race) => race.race_id === this.props.CEO?.race_id) as IRace;
    this.state = { raceName: race?.name };
  }

  render() {
    return (
      <div className="pop-up__view">
        <Field title="Name" value={this.props.CEO?.name} />
        <Field title="Birthday" value={this.props.CEO?.birthday} />
        <Field title="Race name" value={this.state.raceName} />
      </div>
    );
  }
}

const mapStateToProps = function (state: IState, { id }: { id: number | undefined }) {
  return {
    CEO: state.CEOs.find((elem) => elem.corporation_id === id),
    races: state.races,
  };
};

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type props = PropsFromRedux & {
  id: number | undefined;
};

export default connector(PopUpCEOView);
