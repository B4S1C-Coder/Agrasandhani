#Function in which string data will be passed after reading the file and it will return the desired dictionary
def json_correction(data):
    dlist = data.split('},')
    res_d = {}

    #Function to slice strings at calculated indexes and return desired string
    def find_between(s, start_str, end_str):
        start = s.find(start_str)
        if start == -1:
            return None
        start += len(start_str)
        end = s.find(end_str, start)
        if end == -1:
            return None
        return s[start:end].strip().strip('"')

    #Functions to find the corresponding string values
    def find_q(x):
        return find_between(dlist[x], '"question": "', '",')

    def find_1(x):
        return find_between(dlist[x], '"1": "', '",')

    def find_2(x):
        return find_between(dlist[x], '"2": "', '",')

    def find_3(x):
        return find_between(dlist[x], '"3": "', '",')

    def find_4(x):
        return find_between(dlist[x], '"4": "', '",')

    def find_ans(x):
        return find_between(dlist[x], '"ans": "', '"')
    
    # Check if the last element contains a valid answer key i.e. data is complete
    contains_ans = any(f'"ans": "{i}"' in dlist[-1] for i in range(1, 5))

    if contains_ans:
        range_limit = len(dlist)
    else:
        range_limit = len(dlist) - 1 # to ommit the data of the last incomplete q

    for x in range(range_limit):
        #variables being assigned corresponding string values
        question = find_q(x)
        option1 = find_1(x)
        option2 = find_2(x)
        option3 = find_3(x)
        option4 = find_4(x)
        answer = find_ans(x)
        
        if question and option1 and option2 and option3 and option4 and answer:
            #Creating key-value pairs for resultant dictionary
            res_d[f"question{x+1}"] = {
                "question": question,
                "1": option1,
                "2": option2,
                "3": option3,
                "4": option4,
                "ans": answer
            }

    return res_d