import { InputAdornment, TextField, Button } from "@mui/material";
import { Close, Search } from '@mui/icons-material';
import { FormEvent, useCallback, useRef } from "react";
import { UseMutateFunction } from "@tanstack/react-query";
import { spotifyTracksQueryResponse } from "../../../../requests/payloadTypes";
import { useDispatch, useSelector } from "react-redux";
import { saveSearchQuery } from "../../../../redux/slices/cachedResults";
import { selectCachedSearchResults } from "../../../../redux/selectors";

/**
 * The form containing the text input for tracks searching
 */
export default function SearchForm({ formRequest, searchQuery, inputRef }: { 
    formRequest: UseMutateFunction<spotifyTracksQueryResponse, unknown, string, unknown>,
    searchQuery: string,
    inputRef: React.RefObject<HTMLInputElement>
}) {
	const formRef = useRef<HTMLFormElement>(null)
	// const inputRef = useRef<HTMLInputElement>(null)
    const dispatch = useDispatch()
    
	const cachedSearchResults = useSelector(selectCachedSearchResults)

    /**
     * Triggered when the search input is submitted
     */
	const submitSearchInput = useCallback(async (e: FormEvent) => {
		e.preventDefault()
		inputRef.current?.blur()
		formRequest(searchQuery)
	}, [searchQuery])


    return (
        <form autoComplete="off" autoCorrect="off" spellCheck={false} onSubmit={submitSearchInput} ref={formRef}>
            <TextField
                inputRef={inputRef}
                value={searchQuery || cachedSearchResults.searchQuery}
                sx={{ paddingTop: '1em'}}
                InputProps={{
                    sx: {  borderRadius: '25px', paddingRight: 0, paddingLeft: 0, marginRight: '1em', marginLeft: '1em', backgroundColor: 'white' },
                    startAdornment: (
                        <InputAdornment style={{ margin: 0 }} position="start">
                            <Button onClick={() => formRef?.current?.requestSubmit()} disabled={!searchQuery}>
                                <Search/>
                            </Button>
                        </InputAdornment>
                    ),
                    endAdornment: !searchQuery ? null : (
                        <InputAdornment position="end">
                            <Button onClick={() => { 
                                inputRef.current?.focus()
                                dispatch(saveSearchQuery({ searchQuery: ''}))
                            }}>
                                <Close color='disabled' />
                            </Button>
                        </InputAdornment>
                    )
                }}
                inputProps={{ style: { height: '1.5em' }}}
                style={{ width: '100%', position:'relative' }}
                placeholder="Rechercher un morceau"
                type="text"
                onChange={(input) => {
                    dispatch(saveSearchQuery({ searchQuery: input.target.value }))
                }}
            />
        </form>
    )
    
}
