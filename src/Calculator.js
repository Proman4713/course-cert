import { useRef, useState } from "react";
import "./Calculator.css";
import CalcButton from "./components/CalcButton";

export default function Calculator() {
	const [totalVal, setTotalVal] = useState("");
	const [operationsDisabled, setOperationsDisabled] = useState(true);
	const inputRef = useRef(null);

	const updateValueAndScroll = (newValue) => {
		setTotalVal(newValue);
		
		setTimeout(() => {
			if (inputRef.current) {
				inputRef.current.scrollLeft = inputRef.current.scrollWidth;
			}
		}, 0);
	};

	const btnProps = { totalVal, setTotalVal: updateValueAndScroll, operationsDisabled, setOperationsDisabled };

	return (
		<>
			<div className="calculator">
				<h1 className="title">Calculator <span className="made-on">made on <span className="ubuntu">Ubuntu</span></span></h1>
				<div className="input-and-controls">
					<div className="input">
						<input ref={inputRef} disabled type="text" value={totalVal} />
					</div>
					<div className="control-buttons">
						<CalcButton
							className="numbers"
							value="Del"
							isDel
							{...btnProps}
						/>
						<CalcButton
							className="numbers"
							value="CE"
							isCE
							{...btnProps}
						/>
					</div>
				</div>
				<div className="button-grid">
					<CalcButton
						className="numbers"
						value="1"
						{...btnProps}
					/>
					<CalcButton
						className="numbers"
						value="2"
						{...btnProps}
					/>
					<CalcButton
						className="numbers"
						value="3"
						{...btnProps}
					/>
					<CalcButton
						className="operations"
						value="+"
						{...btnProps}
					/>
					<CalcButton
						className="numbers"
						value="4"
						{...btnProps}
					/>
					<CalcButton
						className="numbers"
						value="5"
						{...btnProps}
					/>
					<CalcButton
						className="numbers"
						value="6"
						{...btnProps}
					/>
					<CalcButton
						className="operations"
						value="-"
						{...btnProps}
					/>
					<CalcButton
						className="numbers"
						value="7"
						{...btnProps}
					/>
					<CalcButton
						className="numbers"
						value="8"
						{...btnProps}
					/>
					<CalcButton
						className="numbers"
						value="9"
						{...btnProps}
					/>
					<CalcButton
						className="operations"
						value="*"
						{...btnProps}
					/>
					<CalcButton
						className="operations"
						value="."
						{...btnProps}
					/>
					<CalcButton
						className="numbers"
						value="0"
						{...btnProps}
					/>
					<CalcButton
						className="numbers"
						value="="
						isEqual
						{...btnProps}
					/>
					<CalcButton
						className="operations"
						value="/"
						{...btnProps}
					/>
				</div>
			</div>
		</>
	);
}