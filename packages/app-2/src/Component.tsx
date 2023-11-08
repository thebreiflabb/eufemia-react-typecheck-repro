import React from 'react';
import { Div } from '@dnb/eufemia';

interface Props {
    children: React.ReactNode;
}

export const Component = ({ children }: Props) => {
    return (
        <Div>
            {children}
            {'sad'}
        </Div>
    );
}
