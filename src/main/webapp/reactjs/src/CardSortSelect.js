import React, {Component} from "react";


class CardSortSelect extends Component {


    constructor(props) {
        super(props);
        this.state = {sortingMode: "none"};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({sortingMode: event.target.value})
        this.props.sortCards(this.state.sortingMode);
    }

    render() {
        return(
            <select value={this.state.sortingMode} onChange={this.handleChange}>
                <option value="none">None</option>
                <option value="byIdAscending">From oldest</option>
                <option value="byIdDescending">From newest</option>
                <option value="byLabelStrait">A-Z by Label</option>
                <option value="byLabelReverse">Z-A by Label</option>
            </select>
        )
    }
}
export default CardSortSelect;