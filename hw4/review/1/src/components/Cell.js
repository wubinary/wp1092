import React, { Component } from "react";

export default class Cell extends React.Component {
    constructor(props) {
      super(props)
      this.spanInput = React.createRef();
      this.state = {
        editing: false,
        value: props.value,
        selected: props.selected,
        enterInput: false,
      }
      
      this.display = this.determineDisplay(
        { x: props.x, y: props.y },
        props.value
      )
      this.timer = 0
      this.delay = 1
      this.prevent = false
    }

    componentDidUpdate(prevProps, prevState) {
        if((prevProps.selected !== this.props.selected)) {
          this.setState({selected: this.props.selected, editing: this.props.selected});
        }
        if((prevProps.value !== this.props.value))
        {
          this.setState({value: this.props.value});
        }
    }

    componentWillReceiveProps(nextProps)
    {
      if(this.props != nextProps)
      {
        this.setState({selected: nextProps.selected});
      }
    }

    componentDidMount() {
      window.document.addEventListener('unselectAll', this.handleUnselectAll)
    }

    componentWillUpdate() {
      this.display = this.determineDisplay(
        { x: this.props.x, y: this.props.y }, this.state.value)
    }

    componentWillUnmount() {
      window.document.removeEventListener('unselectAll', this.handleUnselectAll)
    }

    onChange = (e) => {
      this.setState({ value: e.target.value })
      this.props.onChangedValue(
        {
          x: this.props.x,
          y: this.props.y,
        },
        e.target.value,
      )
      this.display = this.determineDisplay({ x: this.props.x, y: this.props.y }, e.target.value)
    }

    onKeyPressOnInput = (e) => {
      if (e.key === 'Enter') {
        this.hasNewValue(e.target.value)
        this.props.onHandleCursor([this.props.x, this.props.y+1])
        //this.props.updateCells() Still works without this??
      }
    }

    onKeyPressOnSpan = (e) => {
        if (!this.state.editing) {
            this.setState({ editing: true , value: ""})
        }
        if (e.key === 'Del') {
            this.setState({ editing: true , value: ""})
        }
    }

    onKeyDownOnSpan = (e) => {
        if (e.key === 'Delete' || e.key === 'Backspace') {
            this.setState({ editing: true , value: ""})
        }
    }

    onBlur = (e) => {
      this.hasNewValue(e.target.value);
      this.setState({ editing: false , selected: false, value: this.state.value})
    }

    handleUnselectAll = () => {
      if (this.state.selected || this.state.editing) {
        this.setState({ selected: false, editing: false })
      }
    }

    hasNewValue = (value) => {
      this.props.onChangedValue(
        {
          x: this.props.x,
          y: this.props.y,
        },
        value,
      )
      this.setState({ editing: false , selected: false})
    }

    emitUnselectAllEvent = () => {
      const unselectAllEvent = new Event('unselectAll')
      window.document.dispatchEvent(unselectAllEvent)
    }

    clicked = () => {
        console.log("selected", this.props.x, this.props.y)
        this.timer = setTimeout(() => {
            if (!this.prevent) {
            this.emitUnselectAllEvent()
            this.setState({ selected: true })
            }
            this.prevent = false
            if(!this.state.editing)
            {
              this.spanInput.current.focus();
              this.setState({ selected: true })
            }
            if(this.state.selected && (this.state.editing === false))
            {
              this.spanInput.current.focus();
            }
        }, this.delay)
        this.props.onHandleCursor([this.props.x, this.props.y])
    }

    doubleClicked = () => {
      clearTimeout(this.timer)
      this.prevent = true
      this.emitUnselectAllEvent()
      this.setState({ editing: true, selected: true })
    }

    determineDisplay = ({ x, y }, value) => {
      return value
    }

    render() {
        if (this.props.x === 0) {
            if(this.props.y === 0)
            {
                return (
                    <span className="customCell" style={{textAlign: 'center', backgroundColor: '#f0f0f0', fontWeight: 'bold'}}></span>
                )
            }
            else
            {
                if(this.props.highlighted === true)
                {
                    return (
                        <span className="customCell" style={{textAlign: 'center', backgroundColor: '#8b7f7f', fontWeight: 'bold'}}>
                        {this.props.y}
                        </span>
                    )
                }
                else
                {
                    return (
                        <span className="customCell" style={{textAlign: 'center', backgroundColor: '#f0f0f0', fontWeight: 'bold'}}>
                        {this.props.y}
                        </span>
                    )
                }
            }
        }
        // row 0
        if (this.props.y === 0) {
            const alpha = [' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'T', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'AA', 'AB', 'AC', 'AD', 'AE', 'AF', 'AG', 'AH', 'AI', 'AJ', 'AK', 'AL', 'AM', 'AN', 'AO', 'AP', 'AQ', 'AR', 'AT', 'AT', 'AU', 'AV', 'AW', 'AX', 'AY', 'AZ', 'BA', 'BB', 'BC', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BK', 'BL', 'BM', 'BN', 'BO', 'BP', 'BQ', 'BR', 'BT', 'BT', 'BU', 'BV', 'BW', 'BX', 'BY', 'BZ', 'CA', 'CB', 'CC', 'CD', 'CE', 'CF', 'CG', 'CH', 'CI', 'CJ', 'CK', 'CL', 'CM', 'CN', 'CO', 'CP', 'CQ', 'CR', 'CT', 'CT', 'CU', 'CV', 'CW', 'CX', 'CY', 'CZ', 'DA', 'DB', 'DC', 'DD', 'DE', 'DF', 'DG', 'DH', 'DI', 'DJ', 'DK', 'DL', 'DM', 'DN', 'DO', 'DP', 'DQ', 'DR', 'DT', 'DT', 'DU', 'DV', 'DW', 'DX', 'DY', 'DZ', 'EA', 'EB', 'EC', 'ED', 'EE', 'EF', 'EG', 'EH', 'EI', 'EJ', 'EK', 'EL', 'EM', 'EN', 'EO', 'EP', 'EQ', 'ER', 'ET', 'ET', 'EU', 'EV', 'EW', 'EX', 'EY', 'EZ', 'FA', 'FB', 'FC', 'FD', 'FE', 'FF', 'FG', 'FH', 'FI', 'FJ', 'FK', 'FL', 'FM', 'FN', 'FO', 'FP', 'FQ', 'FR', 'FT', 'FT', 'FU', 'FV', 'FW', 'FX', 'FY', 'FZ', 'GA', 'GB', 'GC', 'GD', 'GE', 'GF', 'GG', 'GH', 'GI', 'GJ', 'GK', 'GL', 'GM', 'GN', 'GO', 'GP', 'GQ', 'GR', 'GT', 'GT', 'GU', 'GV', 'GW', 'GX', 'GY', 'GZ', 'HA', 'HB', 'HC', 'HD', 'HE', 'HF', 'HG', 'HH', 'HI', 'HJ', 'HK', 'HL', 'HM', 'HN', 'HO', 'HP', 'HQ', 'HR', 'HT', 'HT', 'HU', 'HV', 'HW', 'HX', 'HY', 'HZ', 'IA', 'IB', 'IC', 'ID', 'IE', 'IF', 'IG', 'IH', 'II', 'IJ', 'IK', 'IL', 'IM', 'IN', 'IO', 'IP', 'IQ', 'IR', 'IT', 'IT', 'IU', 'IV', 'IW', 'IX', 'IY', 'IZ', 'JA', 'JB', 'JC', 'JD', 'JE', 'JF', 'JG', 'JH', 'JI', 'JJ', 'JK', 'JL', 'JM', 'JN', 'JO', 'JP', 'JQ', 'JR', 'JT', 'JT', 'JU', 'JV', 'JW', 'JX', 'JY', 'JZ', 'KA', 'KB', 'KC', 'KD', 'KE', 'KF', 'KG', 'KH', 'KI', 'KJ', 'KK', 'KL', 'KM', 'KN', 'KO', 'KP', 'KQ', 'KR', 'KT', 'KT', 'KU', 'KV', 'KW', 'KX', 'KY', 'KZ', 'LA', 'LB', 'LC', 'LD', 'LE', 'LF', 'LG', 'LH', 'LI', 'LJ', 'LK', 'LL', 'LM', 'LN', 'LO', 'LP', 'LQ', 'LR', 'LT', 'LT', 'LU', 'LV', 'LW', 'LX', 'LY', 'LZ', 'MA', 'MB', 'MC', 'MD', 'ME', 'MF', 'MG', 'MH', 'MI', 'MJ', 'MK', 'ML', 'MM', 'MN', 'MO', 'MP', 'MQ', 'MR', 'MT', 'MT', 'MU', 'MV', 'MW', 'MX', 'MY', 'MZ', 'NA', 'NB', 'NC', 'ND', 'NE', 'NF', 'NG', 'NH', 'NI', 'NJ', 'NK', 'NL', 'NM', 'NN', 'NO', 'NP', 'NQ', 'NR', 'NT', 'NT', 'NU', 'NV', 'NW', 'NX', 'NY', 'NZ', 'OA', 'OB', 'OC', 'OD', 'OE', 'OF', 'OG', 'OH', 'OI', 'OJ', 'OK', 'OL', 'OM', 'ON', 'OO', 'OP', 'OQ', 'OR', 'OT', 'OT', 'OU', 'OV', 'OW', 'OX', 'OY', 'OZ', 'PA', 'PB', 'PC', 'PD', 'PE', 'PF', 'PG', 'PH', 'PI', 'PJ', 'PK', 'PL', 'PM', 'PN', 'PO', 'PP', 'PQ', 'PR', 'PT', 'PT', 'PU', 'PV', 'PW', 'PX', 'PY', 'PZ', 'QA', 'QB', 'QC', 'QD', 'QE', 'QF', 'QG', 'QH', 'QI', 'QJ', 'QK', 'QL', 'QM', 'QN', 'QO', 'QP', 'QQ', 'QR', 'QT', 'QT', 'QU', 'QV', 'QW', 'QX', 'QY', 'QZ', 'RA', 'RB', 'RC', 'RD', 'RE', 'RF', 'RG', 'RH', 'RI', 'RJ', 'RK', 'RL', 'RM', 'RN', 'RO', 'RP', 'RQ', 'RR', 'RT', 'RT', 'RU', 'RV', 'RW', 'RX', 'RY', 'RZ', 'TA', 'TB', 'TC', 'TD', 'TE', 'TF', 'TG', 'TH', 'TI', 'TJ', 'TK', 'TL', 'TM', 'TN', 'TO', 'TP', 'TQ', 'TR', 'TT', 'TT', 'TU', 'TV', 'TW', 'TX', 'TY', 'TZ', 'TA', 'TB', 'TC', 'TD', 'TE', 'TF', 'TG', 'TH', 'TI', 'TJ', 'TK', 'TL', 'TM', 'TN', 'TO', 'TP', 'TQ', 'TR', 'TT', 'TT', 'TU', 'TV', 'TW', 'TX', 'TY', 'TZ', 'UA', 'UB', 'UC', 'UD', 'UE', 'UF', 'UG', 'UH', 'UI', 'UJ', 'UK', 'UL', 'UM', 'UN', 'UO', 'UP', 'UQ', 'UR', 'UT', 'UT', 'UU', 'UV', 'UW', 'UX', 'UY', 'UZ', 'VA', 'VB', 'VC', 'VD', 'VE', 'VF', 'VG', 'VH', 'VI', 'VJ', 'VK', 'VL', 'VM', 'VN', 'VO', 'VP', 'VQ', 'VR', 'VT', 'VT', 'VU', 'VV', 'VW', 'VX', 'VY', 'VZ', 'WA', 'WB', 'WC', 'WD', 'WE', 'WF', 'WG', 'WH', 'WI', 'WJ', 'WK', 'WL', 'WM', 'WN', 'WO', 'WP', 'WQ', 'WR', 'WT', 'WT', 'WU', 'WV', 'WW', 'WX', 'WY', 'WZ', 'XA', 'XB', 'XC', 'XD', 'XE', 'XF', 'XG', 'XH', 'XI', 'XJ', 'XK', 'XL', 'XM', 'XN', 'XO', 'XP', 'XQ', 'XR', 'XT', 'XT', 'XU', 'XV', 'XW', 'XX', 'XY', 'XZ', 'YA', 'YB', 'YC', 'YD', 'YE', 'YF', 'YG', 'YH', 'YI', 'YJ', 'YK', 'YL', 'YM', 'YN', 'YO', 'YP', 'YQ', 'YR', 'YT', 'YT', 'YU', 'YV', 'YW', 'YX', 'YY', 'YZ', 'ZA', 'ZB', 'ZC', 'ZD', 'ZE', 'ZF', 'ZG', 'ZH', 'ZI', 'ZJ', 'ZK', 'ZL', 'ZM', 'ZN', 'ZO', 'ZP', 'ZQ', 'ZR', 'ZT', 'ZT', 'ZU', 'ZV', 'ZW', 'ZX', 'ZY', 'ZZ']
            if(this.props.highlighted)
            {
                return (
                    <span
                        onKeyPress={this.onKeyPressOnSpan}
                        className="customCell"
                        style={{textAlign: 'center', backgroundColor: '#8b7f7f', fontWeight: 'bold'}}
                        role="presentation"
                        tabIndex=""
                        >
                        {alpha[this.props.x]}
                    </span>
                )
            }
            else
            {
                return (
                    <span
                        onKeyPress={this.onKeyPressOnSpan}
                        className="customCell"
                        style={{textAlign: 'center', backgroundColor: '#f0f0f0', fontWeight: 'bold'}}
                        role="presentation"
                        tabIndex=""
                        >
                        {alpha[this.props.x]}
                    </span>
                )
            }
        }

        if (this.state.editing) {
            return (
            <input
                className="customCell"
                style={{outlineColor: 'blue'}}
                type="text"
                onBlur={this.onBlur}
                onKeyPress={this.onKeyPressOnInput}
                value={this.state.value}
                onChange={this.onChange}
                autoFocus
            />
            )
        }

        if (this.state.selected) {
            return (
                <span
                onKeyPress={this.onKeyPressOnSpan}
                onKeyDown={this.onKeyDownOnSpan}
                onMouseDown={e => this.clicked(e)}
                onDoubleClick={e => this.doubleClicked(e)}
                onBlur={this.onBlur}
                //onFocus={e => this.clicked(e)}
                style={{outlineColor: "blue", outlineStyle: "solid", outlineWidth: "medium"}}
                className="customCell"
                role="presentation"
                tabIndex="0"
                ref={this.spanInput}
                >
                {this.state.value}
                </span>
            )
        }
        else{
            return (
                <span
                onKeyPress={this.onKeyPressOnSpan}
                onMouseDown={e => this.clicked(e)}
                onDoubleClick={e => this.doubleClicked(e)}
                onBlur={this.onBlur}
                onFocus={e => this.clicked(e)}
                className="customCell"
                role="presentation"
                ref={this.spanInput}
                >
                {this.state.value}
                </span>
            )
        }
    }
}