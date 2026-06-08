import { Component, ErrorInfo, ReactNode } from "react";
import { Text, View } from "react-native";

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
}
interface ErrorBoundaryState {
    hasError: boolean;
    error: unknown | Error;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor (props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };

    }
    static getDerivedStateFromError(error: unknown | Error) {
        return {hasError: true, error: null }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error(error, errorInfo);
    }

    render(): ReactNode {
        if(this.state.hasError) {
            return (
                this.props.fallback || (
                    <View style={{alignItems: "center"}}>
                        <Text>Teste de erro</Text>
                    </View>
                )
            )
        }
        return this.props.children;
    }
}