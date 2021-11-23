import React, { Component } from 'react';

import qr from 'qr.js';

export default class QrCodeCanvas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        }
    }

    componentDidMount() {
        this.setState({ value: this.props.value })
    }

    componentDidUpdate(prevProps) {
        if (this.props.value !== prevProps.value) {
            this.setState({ value: this.props.value })
        }
    }

    setRef = (ctx, value) => {
        if (!ctx) {
            return;
        }

        this.ctx = ctx.getContext("2d");

        const qrcode = qr(value);

        const size = this.props.size === undefined ? '250' : this.props.size;
        const fgColor = this.props.foreground === undefined ? '#000000' : this.props.foreground;
        const bgColor = this.props.background === undefined ? '#FFFFFF' : this.props.background;
        const margin = this.props.margin === undefined ? 10 : parseInt(this.props.margin);

        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;

        const cells = qrcode.modules;
        if (cells === null) {
            return;
        }

        const tileW = (size - 2 * margin) / cells.length;
        const tileH = (size - 2 * margin) / cells.length;

        this.ctx.fillStyle = bgColor;
        this.ctx.fillRect(0, 0, size + 2 * margin, size + 2 * margin);

        for (let r = 0; r < cells.length; ++r) {
            const row = cells[r];
            for (let c = 0; c < row.length; ++c) {
                if (row[c]) {
                    this.ctx.fillStyle = row[c] ? fgColor : bgColor;
                    const w = (Math.ceil((c + 1) * tileW) - Math.floor(c * tileW));
                    const h = (Math.ceil((r + 1) * tileH) - Math.floor(r * tileH));
                    this.ctx.fillRect(Math.round(c * tileW) + margin, Math.round(r * tileH) + margin, w, h);
                }
            }
        }
    }

    render() {
        const { value } = this.state;
        return (
            value &&
            <canvas
                className={this.props.className}
                width={this.props.size === undefined ? '250' : this.props.size}
                height={this.props.size === undefined ? '250' : this.props.size}
                ref={(ctx) => this.setRef(ctx, value)}
            />

        );
    }
}