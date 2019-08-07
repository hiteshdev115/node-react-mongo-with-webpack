import React, { Component } from 'react';
//import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

class Examples extends Component {
	/*constructor (props) {
		super(props);

		this.getCountryValue = this.getCountryValue.bind(this);
		this.getRegionValue = this.getRegionValue.bind(this);

		// we really only need to stash the selected region + country in state, but I was feeling wacky
		this.state = {
			countryArray: [
				{
          list: () => {
						return (
              <div className="container list-space">
                <div className="section-top-border">
                    <h3 className="mb-30">Demo Page</h3>
                    <div>
                      <CountryDropdown
                        defaultOptionLabel="Select Country"
                        value={this.getCountryValue(0)}
                        onChange={(val) => this.selectCountry(0, val)}/>
                      <RegionDropdown
                        blankOptionLabel="No Country Selected"
                        defaultOptionLabel="Now Select Region"
                        country={this.getCountryValue(0)}
                        value={this.getRegionValue(0)}
                        onChange={(val) => this.selectRegion(0, val)}/>
                    </div>
                </div>
              </div>
						);
					}
				}
			]
		};
	}

	selectCountry (countryArrayIndex, val) {
    const updatedValues = this.state.countryArray;
    updatedValues[countryArrayIndex].country = val;
    this.setState({ countryArray: updatedValues });
	}

	selectRegion (countryArrayIndex, val) {
    const updatedValues = this.state.countryArray;
		updatedValues[countryArrayIndex].region = val;
		this.setState({ countryArray: updatedValues });
	}

	getCountryValue (index) {
    return this.state.countryArray[index].country;
	}

	getRegionValue (index) {
    return this.state.countryArray[index].region;
	}

	getCountryRegionDropDown () {
		let i = 0;
		return this.state.countryArray.map((cntryRegnVal) => {
			//let j = i++;
			return (
				<section key={i}>
					<p>
						<span className="counter">{i}.</span>
						{cntryRegnVal.label}
						
					</p>
					{cntryRegnVal.list()}
				</section>
			);
		});
	}

	render () {
		return (
			<div>
				{this.getCountryRegionDropDown()}
			</div>
		);
	}*/
}

export default Examples;