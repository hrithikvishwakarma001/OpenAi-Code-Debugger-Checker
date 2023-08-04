import { useState } from "react";
import {
	Container,
	Flex,
	Box,
	Heading,
	Select,
	ButtonGroup,
	Button,
} from "@chakra-ui/react";
import CodeEditor from "./components/CodeEditor";
import { MdArrowDropDown } from "react-icons/md";
import { VscDebugAll } from "react-icons/vsc";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { CgArrowsExchange } from "react-icons/cg";
import { codeModes } from "./constants";
import { getConvertedCode, getDebugResponse, getQualityCheck } from "./api";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
	const [code, setCode] = useState(`function add(a, b) {
  return a + b;
}`);
	const [output, setOutput] = useState(
		"function add(a: number, b: number): number {\n  return a + b;\n}"
	);
	const [loading, setLoading] = useState(false);
	const [mode, setMode] = useState("javascript");
	const [convertMode, setConvertMode] = useState("typescript");
	const [showConverterSelect, setShowConverterSelect] = useState(false);

	const handleCodeChange = (newCode) => {
		setCode(newCode);
	};

	const handleModeChange = (e) => {
		setMode(e.target.value);
	};
	const handleConvertModeChange = (e) => {
		setConvertMode(e.target.value);
	};

	const handleCodeConverter = async () => {
		setShowConverterSelect(!showConverterSelect);
		setLoading(true);
		const res = await getConvertedCode(code, mode, convertMode);
		if (res.status === 200) {
			setOutput(res.data.convertedCode);
			toast.success("Code converted successfully");
			setLoading(false);
		} else {
			toast.error("Something went wrong");
		}
	};

	const handleDebug = async () => {
		setLoading(true);
		const res = await getDebugResponse(code);
		if (res.status === 200) {
			setOutput(res.data.debugInfo);
			toast.success("Code debugged successfully");
			setLoading(false);
		} else {
			toast.error("Something went wrong");
		}
	};

	const handleQualityCheck = async () => {
		setLoading(true);
		const res = await getQualityCheck(code);
		if (res.status === 200) {
			setOutput(res.data.qualityReport);
			toast.success("Code quality checked successfully");
			setLoading(false);
		} else {
			toast.error("Something went wrong");
		}
	};

	return (
		<Container maxW={"container.xl"} w='full' p='10'>
			<ToastContainer />
			<Heading
				as='h1'
				size='xl'
				mb={2}
				fontFamily={"'Fira Code', monospace"}
				fontWeight={"900"}>
				Code Editor
			</Heading>
			<Flex my='4' justifyContent={"space-between"} alignItems={"center"}>
				<Select
					icon={<MdArrowDropDown />}
					variant='filled'
					placeholder='Select a language'
					onChange={handleModeChange}
					value={mode}
					maxW={"150px"}>
					{codeModes.map((item) => (
						<option key={item} value={item}>
							{item}
						</option>
					))}
				</Select>
				<ButtonGroup>
					<Select
						icon={<MdArrowDropDown />}
						variant='filled'
						placeholder='Select a language'
						onChange={handleConvertModeChange}
						value={convertMode}
						maxW={"150px"}>
						{codeModes.map((item) => (
							<option key={item} value={item}>
								{item}
							</option>
						))}
					</Select>
					<Button onClick={handleCodeConverter}>
						Convert &nbsp;
						<CgArrowsExchange fontSize='20px' />
					</Button>

					<Button onClick={handleDebug}>
						Debug &nbsp;
						<VscDebugAll fontSize='20px' />
					</Button>
					<Button onClick={handleQualityCheck}>
						Quality Check &nbsp;
						<BsFillPatchCheckFill fontSize='20px' />
					</Button>
				</ButtonGroup>
			</Flex>

			<Flex
				border='2px solid #ccc'
				borderRadius='md'
				p='4'
				w='full'
				h='full'
				bg='white'
				boxShadow='md'
				flexDirection='row'
				justifyContent='space-between'
				alignItems='stretch'>
				<Box flex='1' borderRight={"2px solid #ccc"} maxW={"50%"}>
					<CodeEditor
						value={code}
						onChange={handleCodeChange}
						mode='javascript'
					/>
				</Box>
				<Box
					flex='1'
					px='4'
					borderLeft='2px solid #ccc'
					maxW='50%'
					overflowY='scroll'>
					<Box
						as='pre'
						fontSize='14px'
						whiteSpace='pre-wrap'
						wordBreak='break-word'>
						{loading ? (
							<code>Loading...</code>
						) : (
							<code>{output}</code>
						)}
					</Box>
				</Box>
			</Flex>
		</Container>
	);
}

export default App;
