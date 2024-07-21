import { useEffect, useState } from "react";
import "./CalcButton.css";
import { Parser } from "expr-eval";

const operations = ["+", "-", "/", "*"];
/**
 * 
 * @param {{ totalVal: string, setTotalVal: any, operationsDisabled: boolean, setOperationsDisabled: any, value: string, className: string, isEqual: boolean, isDel: boolean, isCE: boolean }} param0 
 */
export default function CalcButton({ totalVal, setTotalVal, operationsDisabled, setOperationsDisabled, value, className, isEqual, isDel, isCE }) {
	const [disabled, setDisabled] = useState(false);

	useEffect(() => {
		if (className === "operations" && operationsDisabled) {
			setDisabled(true);
		} else if (isEqual && ( operations.includes(totalVal[totalVal.length - 1]) || totalVal === "" )) {
			setDisabled(true);
		} else if ((isDel || isCE) && totalVal === "") {
			setDisabled(true);
		} else {
			setDisabled(false);
		}
	}, [className, operationsDisabled, isEqual, totalVal, isDel, isCE]);

	const handleClick = () => {
		if (value === ".") {
			const parts = totalVal.split(" ");
			const lastPart = parts[parts.length - 1];

			// Check if the last part is a number and if it already contains a decimal dot.
			if (!lastPart.includes(".")) {
				// If the last number doesn't contain a dot, append the new value.
				setTotalVal(totalVal + value);
				setOperationsDisabled(true);
			} // If the last number already contains a dot, skip.
		} else if (className === "operations") {
			setTotalVal(totalVal + " " + value);
			setOperationsDisabled(true);
		} else if (isEqual) {
			const allowedChars = ["+", "-", "/", "*", "."].concat(Array.from("0123456789"));
			const sanitizedVal = totalVal.split('').filter(char => allowedChars.includes(char)).join('');

			const result = new Parser().parse(sanitizedVal).evaluate();
			setTotalVal(result.toString());
		} else if (isDel) {
			const newVal = totalVal.trim().slice(0, -1).trim();
			setTotalVal(newVal);
			if (operations.includes(newVal[newVal.length - 1]) || newVal === "") {
				setOperationsDisabled(true);
			} else {
				setOperationsDisabled(false);
			}
		} else if (isCE) {
			setTotalVal('');
			setOperationsDisabled(true);
		} else {
			setTotalVal(operations.includes(totalVal[totalVal.length - 1])
				? totalVal + " " + value
				: totalVal + value);
			setOperationsDisabled(false);
		}
	}
	
	return (
		<>
			<button disabled={disabled} className={className} onClick={handleClick}>{value}</button>
		</>
	);
}