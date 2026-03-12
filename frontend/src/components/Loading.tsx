import { Box, styled, useTheme } from '@mui/material'
import MetaBalls from './MetaBalls/MetaBalls'


export default function Loading() {
    const theme = useTheme()
    return (
        <Wrapper>
            <MetaBalls color={theme.palette.primary.main}
                cursorBallColor={theme.palette.primary.main}
                cursorBallSize={2}
                ballCount={15}
                animationSize={30}
                enableMouseInteraction
                enableTransparency={true}
                hoverSmoothness={0.15}
                clumpFactor={1}
                speed={0.3} />
        </Wrapper>
    )
}

const Wrapper = styled(Box)({
    display: "flex",
    justifyContent: "center",
    alignItems: 'center',
    minHeight: "80vh",
    overflow: "hidden"
})
